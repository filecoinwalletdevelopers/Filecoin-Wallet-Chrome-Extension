<template>
    <div class="list-wrap">
        <div class="tab">
            <div class="tab-item" v-for="(item,index) in $t('wallet.tab')"
                :key="index"
                :class="{active:type === item.type}"
                @click="selectType(item.type)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="list">
            <div class="list-property-wrap" v-if="type === '1'">
                <div class="list-property">
                    <div class="list-item" @click="skipToToken(symbol,decimals,balance,1)">
                        <div class="logo" v-if="activenNetworks.length">
                            <div class="img-wrap" v-if="owenChain">
                                <img class="img" :src="require(`@/assets/svg/${chainImg}`)"/>
                            </div>
                            <div class="custom-img" v-else>{{chainName.substring(0,1)}}</div>
                        </div>
                        <div class="fil-amount">{{balance|formatBalance(8,decimals)}} {{symbol}}</div>
                        <div class="amount">
                            <div class="usd">
                                {{ currency === 'cny' ? "¥" : "$"}}
                                {{(balance)|formatUsd(2,decimals,price_currency)}}
                            </div>
                        </div>
                    </div>
                    <div
                        class="list-item"
                        v-for="(item,index) in tokenList"
                        :key="index"
                        @click="skipToToken(item.symbol,item.decimals,item.balance,0)"
                    >
                        <div class="logo">
                            <kyCanvas :contract="item.contract" />
                        </div>
                        <div class="fil-amount">{{item.balance|formatBalance(8,item.decimals)}} {{item.symbol}}</div>
                        <!-- <div class="amount">
                            <div class="usd">
                                {{ currency === 'cny' ? "¥" : "$"}}
                                {{(item.balance)|formatUsd(2,item.decimals,price_currency)}}
                            </div>
                        </div> -->
                    </div>
                </div>

                <div class="add-token" v-if="networkType === 'ethereum'" @click="addToken">
                    <i class="el-icon-plus"></i>
                </div>
            </div>
            <div class="list-activity" v-if="type === '2'">
                <div class="activity-item">
                    <div class="activity-wrap">
                        <div class="item-wrap" v-for="(item,index) in activityList" :key="index" @click="showDetail(item)">
                            <transactionItem :item="item" />
                        </div>
                    </div>
                    <div class="no-data" v-if="!activityList.length">{{$t('wallet.noTransactionRecord')}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getQueryString, formatNumber, minimumPrecision, isFilecoinChain } from '@/utils'
import transactionItem from './transaction-item.vue'
import ABI from '@/utils/abi'
import { ethers } from 'ethers'
import { GlobalApi } from '@/api'
import { BigNumber } from 'bignumber.js'
import kyCanvas from '@/components/canvas'
import { Database, reverseOrder } from '@/utils/database.js'
export default {
  data () {
    return {
      type: '1',
      activityList: [],
      tokenList: [],
      db: null
    }
  },
  props: {
    price_currency: Number,
    balance: Number
  },
  filters: {
    addressFormat (val) {
      if (val.length > 12) {
        return val.substr(0, 6) + '...' + val.substr(val.length - 6, 6)
      } else {
        return val
      }
    },
    formatBalance (val, n, decimals) {
      if (decimals) {
        const dec = val / Math.pow(10, Number(decimals))
        const big = new BigNumber(dec)
        const str = big.toFixed()
        if (dec !== 0 && dec < minimumPrecision) {
          const min = new BigNumber(minimumPrecision).toFixed()
          return '<' + min
        } else {
          const num = formatNumber(str, n)
          return num
        }
      } else {
        return 0
      }
    },
    // eslint-disable-next-line camelcase
    formatUsd (val, n, decimals, price_currency) {
      if (decimals) {
        const dec = val / Math.pow(10, Number(decimals))
        if (dec < minimumPrecision) {
          return 0
        } else {
          // eslint-disable-next-line camelcase
          const dep = dec * price_currency
          const ss = new BigNumber(dep).toFixed()
          const num = formatNumber(ss, n)
          return num
        }
      } else {
        return 0
      }
    }
  },
  computed: {
    ...mapState('app', [
      'address',
      'rpc',
      'symbol',
      'networkType',
      'decimals',
      'currency',
      'activenNetworks'
    ]),
    owenChain () {
      let volid = false
      if (this.activenNetworks.length) {
        volid = this.activenNetworks[0].disabled
      }
      return volid
    },
    chainImg () {
      let src = ''
      if (this.activenNetworks.length) {
        src = this.activenNetworks[0].image
      }
      return src
    },
    chainName () {
      let name = ''
      if (this.activenNetworks.length) {
        name = this.activenNetworks[0].name
      }
      return name
    }
  },
  components: {
    transactionItem,
    kyCanvas
  },
  // watch: {
  //   // monitoring RPC changes
  //   async rpc (val) {
  //     if (val) {
  //       await this.getTokenList()
  //       await this.updateActivityList()
  //       await this.getActivityList()
  //     }
  //   }
  // },
  async mounted () {
    const db = new Database()
    this.db = db
    const fromPage = getQueryString('fromPage')
    if (fromPage === 'sendFil' || fromPage === 'messageDetail') {
      this.type = '2'
    }
  },
  methods: {
    async updateActivityList () {
      const mesList = await this.db.getTable('messageList', { rpc: this.rpc })
      const myMesList = mesList.filter(n => {
        return n.from === this.address || n.to === this.address
      })
      myMesList.forEach(async (n) => {
        // Get status
        if (n.type === 'pending') {
          const itemRes = await this.getDetail(n.signed_cid, n)
          console.log(itemRes, 'itemRes 33333')
          if (itemRes) {
            // get detail, update db messageList (type,allGasFee,block_time)
            if (itemRes) {
              await this.db.modifyTable(
                'messageList',
                { signed_cid: n.signed_cid },
                {
                  type: itemRes.type,
                  allGasFee: itemRes.all_gas_fee,
                  block_time: itemRes.block_time,
                  height: itemRes.height
                }
              )
            }
          }
        }
      })
      // delete same nonce （ type = pending）
      this.deleteSameNonce()
    },
    async getActivityList () {
      const mesList = await this.db.getTable(
        'messageList',
        { rpc: this.rpc },
        reverseOrder,
        'create_time'
      )
      const myMesList = mesList.filter(n => {
        return n.from === this.address || n.to === this.address
      })
      this.activityList = myMesList
    },
    // get token list
    async getTokenList () {
      console.log(this.networkType, 'this.networkType')
      if (isFilecoinChain(this.networkType)) {
        this.tokenList = []
        return []
      } else {
        const list = await this.db.getTable(
          'tokenList',
          {
            rpc: this.rpc,
            address: this.address
          }
        )
        const tokenList = []
        const provider = ethers.getDefaultProvider(this.rpc)
        list.forEach(async (n) => {
          try {
            const contract = new ethers.Contract(n.contract, ABI, provider)
            // get balance by address
            contract.balanceOf(this.address).then(res => {
              const balance = res.toString()
              const num = Number(balance)
              tokenList.push(
                {
                  ...n,
                  balance: num
                }
              )
            })
          } catch (err) {
            console.log(err, 'contract.balanceOf error')
          }
        })
        this.tokenList = tokenList
        return tokenList
      }
    },
    // get detail by hash
    // eslint-disable-next-line camelcase
    async getDetail (signed_cid, itemObj) {
      const MyGlobalApi = new GlobalApi()
      MyGlobalApi.setRpc(this.rpc)
      MyGlobalApi.setNetworkType(this.networkType)
      const detail = await MyGlobalApi.getTransaction(signed_cid)
      return detail
    },
    skipToToken (symbol, decimals, balance, isMain) {
      this.$emit('tokenShow', { symbol, decimals, balance, isMain })
    },
    async deleteSameNonce () {
      const mesList = await this.db.getTable('messageList', {
        rpc: this.rpc,
        address: this.address
      })
      const obj = {}
      let nonce = 0
      for (let i = 0; i < mesList.length; i++) {
        if (!obj.nonce) {
          obj.nonce = mesList[i].nonce
        } else {
          nonce = mesList[i].nonce
        }
      }
      if (nonce) {
        await this.db.deleteTable('messageList', {
          rpc: this.rpc,
          address: this.address,
          nonce,
          type: 'pending'
        })
      }
    },
    async selectType (type) {
      this.type = type
      await this.getTokenList()
      await this.updateActivityList()
      await this.getActivityList()
    },
    showDetail (item) {
      const listObj = {
        ...item
      }
      const listObjStr = JSON.stringify(listObj)
      window.location.href = `./message-detail.html?signed_cid=${item.signed_cid}&listObjStr=${listObjStr}`
    },
    addToken () {
      window.location.href = './add-token.html'
    }
  }
}
</script>

<style lang="less" scoped>

@keyframes rotate{
0%{
transform: rotateZ(0deg);/*从0度开始*/
}
100%{
transform: rotateZ(360deg);/*360度结束*/
}
}
    .list-wrap{
        .tab{
            display: flex;
            .tab-item{
                height: 40px;
                line-height: 40px;
                color: #222;
                text-align: center;
                flex-grow: 1;
                cursor: pointer;
                font-size: 14px;
                &.active{
                    color: #5CC1CB;
                    position: relative;
                    &::after{
                        content: '';
                        width: 100%;
                        height: 2px;
                        background: #5CC1CB;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
        }
        .list{
            .list-property-wrap{
                position: relative;
                height: 240px;
                padding-bottom: 50px;
                .add-token{
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    border-radius: 12px;
                    background: #5CC1CB;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                        color: #fff;
                        font-weight: bold;
                        margin-bottom: 3px;
                    }
                }
            }
            .list-property{
                height: 235px;
                overflow-y: auto;
                .list-item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 20px;
                    cursor: pointer;
                    .logo{
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                        .img-wrap{
                            width: 30px;
                            height: 30px;
                            .img{
                                width: 30px;
                                height: 30px;
                            }
                        }
                        .custom-img{
                            background: #5CC1CB;
                            width: 30px;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 18px;
                            color: #fff;
                            border-radius: 15px;
                            line-height: 30px;
                        }
                    }
                    .amount{
                        padding-left: 5px;
                        .fil{
                            font-size: 16px;
                            color: #222;
                            font-weight: bolder;
                        }
                        .usd{
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .fil-amount{
                        flex-grow: 1;
                        padding-left: 10px;
                        font-size: 12px;
                        color: #131313;
                        font-weight: bolder;
                    }
                }
            }
            .list-activity{
                .no-data{
                    padding: 15px 0;
                    font-size: 16px;
                    text-align: center;
                    color: #c2c2c2;
                }
            }
        }
    }
</style>
