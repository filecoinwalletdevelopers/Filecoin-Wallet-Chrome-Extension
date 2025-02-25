<template>
    <layout @layoutMounted="layoutMounted">
        <div class="wallet-page" >
            <bHeader
                @openNetwork="openNetwork"
            />
            <div class="content">
                <kyTop
                    v-if="rpc"
                    :balance="balance"
                    :mask.sync="mask"
                    :editNameVisable.sync="editNameVisable"
                    :deleteUserVisible.sync="deleteUserVisible"
                    :receiveVisible.sync="receiveVisible"
                />
                <kyList
                    v-if="address && rpc"
                    :price_currency="price_currency"
                    :balance="balance"
                    @tokenShow="tokenShow"
                    ref="kyList"
                />
            </div>

            <el-dialog
                :visible.sync="networkVisible"
                width="100%"
                :show-close="false"
                class="network-dialog"
                :modal="false"
                :top="'0'"
            >
                <kyNetwork
                    @closeNetwork="closeNetwork"
                    @networkChange="networkChange"
                />
            </el-dialog>

            <el-dialog
                :visible.sync="editNameVisable"
                width="300px"
                :show-close="false"
                :top="'31vh'"
            >
                <editName
                    :addressName.sync="addressName"
                    @confirmEdit="confirmEdit"
                    @closeEdit="closeEdit"
                />
            </el-dialog>

            <el-dialog
                :visible.sync="deleteUserVisible"
                width="300px"
                :top="'31vh'"
                :show-close="false"
            >
                <deleteUser
                    @confirmDelete="confirmDelete"
                    @closeDelete="closeDelete"
                />
            </el-dialog>

            <el-dialog
                :visible.sync="receiveVisible"
                width="100%"
                :fullscreen='true'
                :top="'0'"
                :show-close="false"
            >
                <receive
                    :QRUrl="QRUrl"
                    :accountName.sync="accountName"
                    :address="address"
                    @closeReceive="closeReceive"
                />
            </el-dialog>

            <el-dialog
                :visible.sync="tokenVisible"
                width="100%"
                :fullscreen='true'
                :top="'0'"
                :show-close="false"
            >
                <kyToken
                    :tokenIsMain="tokenIsMain"
                    :tokenDecimals="tokenDecimals"
                    :tokenBalance="tokenBalance"
                    :tokenName="tokenName"
                    :price_currency="price_currency"
                    :receiveVisible.sync="receiveVisible"
                    :symbol="symbol"
                    :tokenList="tokenList"
                    @closeToken="tokenVisible = false"
                />
            </el-dialog>
            <div class="loading" v-if="isLoading">
                <img :src="loading" alt="" class="img">
            </div>
            <div class="mask" v-if="mask" @click="maskClick"></div>
        </div>
    </layout>
</template>
<script>
import bHeader from '@/components/header'
import layout from '@/components/layout'
import editName from './edit-name.vue'
import deleteUser from './delete-user.vue'
import receive from './receive.vue'
import kyTop from './top.vue'
import kyList from './transaction-list.vue'
import kyToken from './token.vue'
import kyNetwork from '@/components/header/network.vue'
import { GlobalApi } from '@/api'
import QRCode from 'qrcode'
import { mapMutations, mapState } from 'vuex'
import { Database, reverseOrder } from '@/utils/database.js'
export default {
  data () {
    return {
      mask: false,
      loading: require('@/assets/image/loading.png'),
      isLoading: false,
      addressName: '',
      editNameVisable: false,
      deleteUserVisible: false,
      receiveVisible: false,
      tokenVisible: false,
      balance: 0,
      price_currency: 0,
      QRUrl: '',
      signed_cid: '',
      tokenName: '',
      tokenDecimals: 0,
      tokenList: [],
      tokenBalance: 0,
      tokenIsMain: 0,
      networkVisible: false,
      db: null
    }
  },
  computed: {
    ...mapState('app', [
      'rpc',
      'symbol',
      'accountName',
      'address',
      'privateKey',
      'ids',
      'networkType',
      'currency',
      'accountList'
    ])
  },
  components: {
    layout,
    bHeader,
    editName,
    deleteUser,
    receive,
    kyTop,
    kyList,
    kyToken,
    kyNetwork
  },
  mounted () {
    const db = new Database()
    this.db = db
  },
  methods: {
    ...mapMutations('app', [
      'SET_PRIVATEKEY',
      'SET_ADDRESS',
      'SET_DIGEST',
      'SET_ACCOUNTNAME'
    ]),
    async layoutMounted () {
      const address = this.address
      const rpc = this.rpc
      const networkType = this.networkType
      try {
        this.getQRCode()
        this.isLoading = true
        this.addressName = this.accountName
        await this.getPrice()
        const balance = await this.getBalanceNonce(address, rpc, networkType)
        this.balance = balance
        await this.db.modifyTable(
          'activeAccount',
          {
            address: address,
            rpc: rpc
          },
          {
            fil: balance
          }
        )
        await this.db.modifyTable(
          'accountList',
          {
            address: address,
            rpc: rpc
          },
          {
            fil: balance
          }
        )
        this.isLoading = false
        await this.$refs.kyList.getTokenList()
        await this.$refs.kyList.updateActivityList()
        await this.$refs.kyList.getActivityList()
      } catch (error) {
        this.isLoading = false
      }
    },
    networkChange () {
      this.closeNetwork()
      this.layoutMounted()
    },
    openNetwork () {
      this.mask = true
      this.networkVisible = true
    },
    closeNetwork () {
      this.mask = false
      this.networkVisible = false
    },
    maskClick () {
      this.mask = false
      this.networkVisible = false
    },
    // edit current address
    confirmEdit () {
      const addressName = this.addressName
      if (addressName) {
        const address = this.address
        const rpc = this.rpc
        this.SET_ACCOUNTNAME(addressName)
        this.db.modifyTable(
          'accountList',
          {
            address: address,
            rpc: rpc
          },
          {
            accountName: addressName
          }
        )
        this.db.modifyTable(
          'activeAccount',
          {
            address: address,
            rpc: rpc
          },
          {
            accountName: addressName
          }
        )
        this.editNameVisable = false
      }
    },
    closeEdit () {
      this.editNameVisable = false
    },
    // delete current address
    async confirmDelete () {
      if (this.accountList.length === 1) {
        await this.db.clearTable()
        window.location.href = './welcome.html'
      } else {
        if (this.accountList.length) {
          await this.db.deleteTable('activeAccount', { khazix: 'khazix' })
          await this.db.modifyTable(
            'accountList',
            {
              address: this.address,
              rpc: this.rpc
            },
            {
              isDelete: 1
            }
          )
          const _accountList = await this.db.getTable('accountList', { rpc: this.rpc, isDelete: 0 })
          const first = _accountList.find((n, index) => {
            return index === 0
          })
          const { privateKey, address, digest, accountName } = first
          this.SET_PRIVATEKEY(privateKey)
          this.SET_ADDRESS(address)
          this.SET_DIGEST(digest)
          this.SET_ACCOUNTNAME(accountName)
          await this.db.addTable('activeAccount', first)
          window.location.href = './wallet.html'
        } else {
          window.location.href = './welcome.html'
        }
      }
    },
    closeDelete () {
      this.deleteUserVisible = false
    },
    // get exchange rate
    async getPrice () {
      if (this.ids) {
        const MyGlobalApi = new GlobalApi()
        MyGlobalApi.setRpc(this.rpc)
        MyGlobalApi.setNetworkType(this.networkType)
        const res = await MyGlobalApi.getPrice(this.ids)
        const { usd, cny } = res
        if (this.currency === 'cny') {
          this.price_currency = cny
        } else {
          this.price_currency = usd
        }
      }
    },
    sendFil () {
      window.location.href = './send-fil.html'
    },
    // get current account balance
    async getBalanceNonce (address, rpc, networkType) {
      let balance = 0
      const MyGlobalApi = new GlobalApi()
      MyGlobalApi.setRpc(rpc)
      MyGlobalApi.setNetworkType(networkType)
      const res = await MyGlobalApi.getBalance(address)
      balance = res && res.balance
      return balance
    },
    openReceive () {
      this.receiveVisible = true
    },
    closeReceive () {
      this.receiveVisible = false
    },
    // Get address QR code
    getQRCode () {
      QRCode.toDataURL(this.address).then(QRUrl => {
        this.QRUrl = QRUrl
      })
    },
    // asset details
    async tokenShow (obj) {
      const { symbol, decimals, balance, isMain } = obj
      this.tokenName = symbol
      this.tokenDecimals = Number(decimals)
      this.tokenBalance = balance
      this.tokenIsMain = isMain
      const mesList = await this.db.getTable(
        'messageList',
        { rpc: this.rpc },
        reverseOrder,
        'create_time'
      )
      const tokenList = mesList.filter(n => {
        return ((n.from === this.address) && (n.token === symbol)) || ((n.to === this.address) && (n.token === symbol))
      })
      console.log(tokenList, ' tokenList 2222')
      this.tokenList = tokenList.map(n => {
        return {
          ...n
        }
      })
      this.tokenVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.wallet-page{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 999;
    }
    .loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        .img{
            animation:turnX 3s linear infinite;
        }
        @keyframes turnX{
            0%{
                transform:rotateZ(0deg);
            }
            100%{
                transform:rotateZ(360deg);
            }
        }
    }
    /deep/.el-dialog{
        margin: 0 auto;
        border-radius: 10px;
        &.is-fullscreen{
            border-radius: 0;
            .el-dialog__body{
                width: 100%;
                height: 100%;
            }
        }
    }
    /deep/.el-dialog__header{
        padding:0;
    }
    /deep/.el-dialog__body{
        padding: 0;
    }
    /deep/.el-dialog__footer{
        padding: 30px;
        border-top:1px solid #eee;
    }

    /deep/.network-dialog{
        bottom: 0;
        top: auto;
        .el-dialog{
            border-radius: 10px 10px 0 0;
        }
    }
}
</style>
