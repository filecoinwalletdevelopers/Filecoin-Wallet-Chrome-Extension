const create_time =  parseInt(new Date().getTime() / 1000)
const ja = {
  header:{
    customRpc:'カスタムRPC'
  },
  welcome: {
    title:'FiveTokenをご利用頂きありがとうございます',
    subTitle1:'Filecoin生態分野の接続器で、複数チェーンを融合し、未来の保存世界への入口である。',
    subTitle2:'ようこそ。',
    btn1:'新しいウォレットを作成する',
    btn2:'既存ウォレットを導入する'
  },
  creatWallet:{
    title:'新しいウォレットを作成する',
    importWords:'ニーモニック導入',
    back:'前へ',
    accountName:'アカウントネームをご入力ください',
    nameTips:'15文字以内',
    nameError:'無効なアカウントネーム',
    password:'アカウントパスワードをご入力ください',
    passwordTips:'8桁以上の文字',
    passwordError:'無効なパスワード',
    diffError:'パスワードが間違っています',
    correctPassword:'正しいパスワードをご入力ください',
    confirmPassword:'パスワード確認',
    btn:'次へ'
  },
  creatWords:{
    title:'ニーモニックバックアップ',
    subTitle:'順を追いニーモニックをお書きください',
    showWords:'ここをクリックし密語を表示させる',
    btn1:'ニーモニック検証',
    btn2:'ウォレットに入る',
    copy:'ニーモニックコピー',
    copySuccess:'コピー成功',
    tips1:'！ ニーモニックを如何なるネットと隔離した安全なところにご保存ください。',
    tips2:'！ ネットワーク（例：e-メール、アルバム、社交アプリなど）でニーモニックの共有と保存をしないでください。',
  },
  checkWords:{
    title:'ニーモニック検証',
    subTitle:'順を追い以下のニーモニックをクリックし、バックアップ検証を完遂してください。',
    btn:'確認',
    checkError:'ニーモニック検証エラー'
  },
  importWords:{
    title:'導入助记词',
    subTitle:'ウォレットを復旧させるために、ニーモニックをご入力ください',
    tips:'単語をスペースで区切る',
    btn:'輸入',
    error:'ニーモニックエラー',
    exist:'アカウントは存在しています'
  },
  importPrivatkey:{
    title:'秘密鍵導入',
    label1:'対応するネットワークをご選択ください',
    label2:'ウォレットを復旧させるために、秘密鍵をご入力ください',
    btn:'輸入',
    titleNetwork:'ネットワーク選択',
    importError:'タイプは対応できません',
    exist:'アカウントは存在しています'
  },
  account:{
    title:'アカウント',
    lock:'ロック',
    mneAccount:'ニーモニックアカウント',
    pkAccount:'秘密鍵アカウント',
    createWallet:'ウォレット作成',
    import:'秘密鍵導入',
    setting:'設定',
    titleAdd:'アカウント追加',
    addTips:'当該アドレスに同一ニーモニックを利用しています',
    addLabel:'アカウントネーム',
    confirm:'確認',
    cancel:'キャンセル'
  },
  wallet:{
    tab:[
      {name:'資産',type:'1'},
      {name:'活動',type:'2'}
    ],
    menu:[
      {name:'アカウントネーム変更',action:'editName'},
      {name:'ブロックチェーンブラウザ閲覧',action:'viewInBrowser'},
      {name:'秘密鍵バックアップ',action:'backupPrivateKey'},
      {name:'ウォレット削除',action:'deleteWallet'}
    ],
    statusSuccess:'完了',
    statusError:'失敗',
    statusPending:'確認中',
    send:'発信',
    received:'受信',
    labelSend:'発信先',
    labelReceived:'受信元',
    titleEdit:'アカウントネーム変更',
    editLabel:'アカウントネーム',
    editTips:'15文字以内',
    cancel:'キャンセル',
    confirm:'確認',
    deleteTitle:'削除確認',
    deleteTips:'秘密鍵はバックアップされたことをご確認ください。削除後、当該ウォレットを表示したい場合、秘密鍵を利用し導入する必要があります。',
    copyAddress:'アドレスコピー',
    copySuccess:'正常にコピー',
    tranRecord:'活動記録',
    noTransactionRecord:'活動記録がありません',
    waiting:'待っている',
    noBrowser:'現在のネットワークはブロックチェーンブラウザアドレスが追加されていません'
  },
  messageDetail:{
    title:'メッセージ詳細',
    amount:'数量',
    willgasFee:"推定最大手数料",
    gasFee:'手数料',
    from:'発信者',
    to:'受信者',
    messageId:'メッセージID',
    success:'成功',
    error:'失敗',
    pending:'確認中',
    height:'高さ',
    noBrowser:'現在のネットワークはブロックチェーンブラウザアドレスが追加されていません'
  },
  addToken:{
    addToken:'トークン追加',
    contractAddress:'契約アドレス',
    token:'トークン',
    tokenSymbol:'トークンシンボル',
    decimalPoint:'小数点',
    error:'トークンは追加済み',
    addressError:'契約アドレスが正しくありません'
  },
  sendFil:{
    cancel:'キャンセル',
    confirm:'確認',
    send:'発信',
    token:'トークン',
    toAddress:'受信アドレス',
    number:'数量',
    all:'全て',
    available:'利用可能',
    selectToken:'トークンを選ぶ',
    selectAddress:'アドレスを選ぶ',
    recordLast:'最近の記録',
    myAccount:'マイアカウント',
    addressBook:'アドレスブック',
    gasLimit:'ガスリミット',
    confirmTransaction:'取引確認',
    sendAmount:'金額発信',
    networkGas:'ネットワークガス',
    maxGas:'最大Gas費用見積',
    totalTips:'金額+Gas費用見積発信',
    total:'総額',
    gasFeeError:'現在のBaseFee以下',
    gasLimitError:'現在のGas Limit以下',
    addressError:'アドレスフォーマットエラー',
    insufficientBalance:'残高不十分',
    filBaseFeeTips:'ネットワーク料金はネットワーク料金の支払いに使用され、メッセージはネットワーク料金レート> BaseFeeの場合にのみパッケージ化されます。 nanoFIL = 10 ^ -9',
    baseFeeTips:'Gガス価格は、ガスの単位あたりの支払いトークンの数です、Gwei = 10 ^ -9',
    gasLimitTips:'ガス制限は、メッセージを送信するときに消費される最大ガスです。',
    vaildNumber:'有効な数値を入力してください'
  },
  setting:{
    name:'設定',
    currency:'貨幣',
    language:'言語',
    titleCurrency:'貨幣選択',
    titlelanguage:'言語選択',
    currencyList:[
      {label:'USD',value:'usd'},
      {label:'CNY',value:'cny'}
    ],
    languageList:[
      {label:'English',value:'en'},
      {label:'한국어',value:'ko'},
      {label:'日本語',value:'ja'},
      {label:'中文',value:'zh'}
    ],
    menu:[
      {name:'インターネット',url:'./setting-networks.html'},
      {name:'アドレスブック',url:'./setting-address.html'},
      {name:'秘密鍵のエクスポート',url:'./setting-backups.html'},
      {name:'について',url:'./setting-about.html'},
   ]
  },
  settingNetworks:{
    title:'インターネット',
    addNetwork:'ネットワーク追加',
    networkName:'ネットワークネーム',
    deleteTitle:'ネットワークを削除する',
    editNewwork:'ネットワークの編集',
    viewNetwork:'インターネット情報',
    addTips:' 悪意のあるネットワークはブロックの状態に嘘をつくことがあるので、信頼できるネットワークをご追加ください。',
    chainID:'チェーンID',
    symbol:'シンボル',
    rpc:"RPC URL",
    browser:'ブロックブラウザURL（オプション）',
    cancel:'キャンセル',
    confirm:'確認',
    save:'保存する',
    addError:'対応しないネットワーク',
    isExistError:'RPC 存在した',
    delete:'削除',
    deleteTips:'このネットワークを削除してもよろしいですか？',
    deleteSuccess:'正常に削除されました'
  },
  settingAbout:{
    about:'について',
    filVersion:'FiveToken',
    Version:'Version',
    tips:'Filecoin生態分野の接続器で、複数チェーンを融合し、未来の保存世界への入口である。',
    privacy:'プライバシー政策',
    useRule:'ユーザ利用協議'
  },
  settingBackups:{
    backupsCheck:'バックアップ検証',
    backupsWords:'ニーモニックバックアップ',
    backupsPk:'秘密鍵バックアップ',
    pkTips:'他人に見せないでください。秘密鍵を持つ人はお使いのアカウントが管理できます。',
    mneTips:'他人に見せないでください。ニーモニックを持つ人はお使いのアカウントが管理できます。',
    next:'次の一歩',
    close:'クローズ',
    inputPassword:'パスワード入力',
    copy:'クリップボードに貼り付ける',
    copySuccess:'正常にコピー',
    passwordError:'パスワードエラー',
    yourMne:'お使いのニーモニック',
    yourPk:'お使いの秘密鍵'
  },
  settingAddress:{
    addressBook:'アドレスブック',
    name:'タブネーム',
    address:'アドレス',
    addressError:'アドレスフォーマットエラー',
    edit:'编辑',
    cancel:'キャンセル',
    confirm:'確認',
    addAddress:'アドレス追加',
    addressDetail:'アドレス詳細',
    editAddress:'アドレス編集',
    copySuccess:'正常にコピー',
    editSuccess:'編集成功',
    addressIsExist:'アドレスは存在する',
    add:'追加',
    delete:'削除',
    deleteTitle:'アドレスを削除する',
    deleteTips:'このアドレスを削除してもよろしいですか？',
    deleteSuccess:'正常に削除されました'
  },
  lock:{
    title:'FiveTokenをご利用頂きありがとうございます',
    subTitle:'Filecoin生態分野の接続器で、複数チェーンを融合し、未来の保存世界への入口である。',
    unlocking:'アンロック',
    label:'パスワード',
    passwordError:"パスワードエラー"
  },
  connect:{
    title:'FiveTokenで接続する',
    cancel:'キャンセル',
    connect:'接続'
  },   
  defaultNetworks:[
    {
        name:'Filcoin Mainnet',
        // rpc:'http://192.168.1.161:8081',
        rpc:'https://api.fivetoken.io',
        chainID:'',
        symbol:'FIL',
        ids:'filecoin',
        browser:'https://filscan.io',
        khazix:'khazix',
        create_time:create_time,
        networkType:'proxy',
        filecoinAddress0:'f',
        decimals:18,
        disabled:true,
        image:'fil.svg',
        deriveIndex:0
    },
    {
        name:'Ethereum Mainnet',
        rpc:'https://mainnet.infura.io/v3/96837d28a772466ca6ed88eddb221e09',
        chainID:'1',
        symbol:'ETH',
        browser:'https://etherscan.io',
        ids:'ethereum',
        khazix:'khazix',
        networkType:'ethereum',
        filecoinAddress0:'',
        create_time:create_time+1,
        decimals:18,
        image:'eth.svg',
        disabled:true,
        deriveIndex:0
    },
    {
        name:'Binance Smart Chain',
        rpc:'https://bsc-dataseed.binance.org',
        chainID:'56',
        symbol:'BNB',
        ids:'binancecoin',
        browser:'https://bscscan.com',
        khazix:'khazix',
        networkType:'ethereum',
        filecoinAddress0:'',
        create_time:create_time+2,
        decimals:18,
        image:'bnb.svg',
        disabled:true,
        deriveIndex:0
    },
    {
        name:'Filecoin Calibration Testnet',
        // rpc:'http://192.168.1.161:9091',
        rpc:'https://api.calibration.fivetoken.io',
        chainID:'',
        symbol:'FIL',
        ids:'filecoin',
        browser:'https://calibration.filscan.io',
        khazix:'khazix',
        networkType:'proxy',
        filecoinAddress0:'t',
        create_time:create_time+3,
        decimals:18,
        image:'fil.svg',
        disabled:true,
        deriveIndex:0
    },
    {
        name:'Ropsten Test Network',
        rpc: 'https://ropsten.infura.io/v3/96837d28a772466ca6ed88eddb221e09',
        chainID: '3',
        symbol:'ETH',
        ids:'ethereum',
        browser: 'https://ropsten.etherscan.io',
        khazix:'khazix',
        networkType:'ethereum',
        filecoinAddress0:'',
        create_time:create_time+4,
        decimals:18,
        image:'eth.svg',
        disabled:true,
        deriveIndex:0
    },
    {
      name:'Kovan Test Network',
      rpc: 'https://kovan.infura.io/v3/96837d28a772466ca6ed88eddb221e09',
      chainID: '42',
      symbol:'ETH',
      ids:'ethereum',
      browser: 'https://kovan.etherscan.io',
      khazix:'khazix',
      networkType:'ethereum',
      filecoinAddress0:'',
      create_time:create_time+5,
      decimals:18,
      image:'eth.svg',
      disabled:true,
      deriveIndex:0
    },
    {
      name:'Rinkeby Test Network',
      rpc: 'https://rinkeby.infura.io/v3/96837d28a772466ca6ed88eddb221e09',
      chainID: '4',
      symbol:'ETH',
      ids:'ethereum',
      browser: 'https://rinkeby.etherscan.io',
      khazix:'khazix',
      networkType:'ethereum',
      filecoinAddress0:'',
      create_time:create_time+6,
      decimals:18,
      image:'eth.svg',
      disabled:true,
      deriveIndex:0
    },
    {
      name:'Goerli Test Network',
      rpc: 'https://goerli.infura.io/v3/96837d28a772466ca6ed88eddb221e09',
      chainID: '5',
      symbol:'ETH',
      ids:'ethereum',
      browser: 'https://goerli.etherscan.io',
      khazix:'khazix',
      networkType:'ethereum',
      filecoinAddress0:'',
      create_time:create_time+7,
      decimals:18,
      image:'eth.svg',
      disabled:true,
      deriveIndex:0
    },
    {
      name:'Binance TEST',
      rpc:'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainID:'56',
      symbol:'BNB',
      ids:'binancecoin',
      browser:'https://testnet.bscscan.com',
      khazix:'khazix',
      networkType:'ethereum',
      filecoinAddress0:'',
      create_time:create_time+8,
      decimals:18,
      image:'bnb.svg',
      disabled:true,
      deriveIndex:0
    },
  ]
}
export default ja