/* Coordinates use a side-on promenade. Short scenes leave room for imagination. */
window.PLANETS = [
 {id:'minato',name:'ミナト',caption:'最後の船が発った港町',chapter:'01',population:327,description:'帰らない船を、誰かが待っていた。',art:'assets/minato.png',width:2400,ground:.647,spawn:210,ship:145,skyColor:'#061424',memoryStar:[.77,.18],memories:[
  {id:'minato-fish',x:515,title:'朝の仕度',place:'閉じた魚屋',object:'使い込まれた秤',kind:'market',sound:'bell',lines:['シャッターの向こうで、水の音がする。','「今日は少し、多めにとっておこうか。」','濡れた新聞紙。欠けた秤。まだ明けきらない朝。'],note:'毎朝、いちばん早く開く店だった。秤の針は、今も少しだけ右に傾いている。'},
  {id:'minato-cafe',x:990,title:'ふたつの珈琲',place:'喫茶・月舟',object:'窓辺の日記',kind:'cafe',sound:'cup',lines:['カップが、ふたつ重なる音。','「明日も、窓の席でいいですか。」','返事のかわりに、頁が一枚めくられた。'],note:'日記には天気ばかりが書かれていた。最後の頁だけ、「また明日」。'},
  {id:'minato-ticket',x:1470,title:'片道の切符',place:'止まった駅の時計',object:'古い切符',kind:'train',sound:'train',lines:['止まっていた時計の針が、一度だけ動く。','「お忘れ物のないように。……お元気で。」','最終便。ホームには、見送る人がひとり。'],note:'日付の読めない片道切符。角は何度も握り直したように、丸くなっている。'},
  {id:'minato-bench',x:1880,title:'消えかけた名前',place:'駅前のベンチ',object:'背もたれの小さな傷',kind:'friends',sound:'bell',lines:['大きな鞄と、小さな鞄。ふたつの影が並んでいる。','「大人になったら、どこへ行く？」','答えは聞こえない。笑う声だけが、夜に残った。'],note:'背もたれに二つの名前。片方は、もう読めない。'},
  {id:'minato-laundry',x:2220,title:'白いシャツ',place:'路地の物干し',object:'風に揺れる洗濯物',kind:'laundry',sound:'wind',lines:['窓が開く。洗いたての布の匂い。','「晴れたら、ちゃんと乾くから。」','雨の降らなくなった星で、白いシャツが揺れている。'],note:'ひとりになってからも、暮らしは続いていた。干されたシャツの袖が、誰かを招くように揺れる。'},
  {id:'minato-last',x:2070,title:'港を見ていた人',place:'夜の船着き場',object:'最後の住人の手紙',kind:'waiting',sound:'sea',final:true,lines:['ほかの灯りが消えてからも、老人は港へ来ていた。','「今日も、よく見える。」','誰を待っていたのかは、手紙に書かれていない。','少年はしばらく、同じ方角を見ていた。'],note:'かつて327人が暮らしたミナト。最後のひとりは、毎晩ここから宇宙を見ていた。待っていた相手の名は、分からない。'}]},
 {id:'home',name:'灯りの残る家',caption:'ふたりぶんの、小さな星',chapter:'02',population:2,description:'ただいま、と言うには少し静かすぎる。',art:'assets/home.png',width:2000,ground:.693,spawn:300,ship:200,skyColor:'#0a192b',memoryStar:[.32,.18],memories:[
  {id:'home-soup',x:1070,title:'ふたりぶんのスープ',place:'小さな家の食卓',object:'欠けた器',kind:'cafe',sound:'cup',lines:['食卓には、ふたつの器。片方だけ、ほこりをかぶっていない。','「冷めないうちに、おあがり。」','誰もいない椅子の向こうに、湯気がのぼった。'],note:'ふたりぶんのスープを作る習慣は、最後まで変わらなかった。'},
  {id:'home-boots',x:850,title:'小さな靴',place:'玄関のそば',object:'そろえられた靴',kind:'child',sound:'bell',lines:['小さな足音が、家を一周する。','「この星、小さくてよかったね。」','どこにいても、呼ぶ声が届いた。'],note:'玄関の靴は、つま先を外に向けてそろえられている。いつでも出かけられるように。'},
  {id:'home-garden',x:1515,title:'庭の約束',place:'月白の木の下',object:'古い風鈴',kind:'garden',sound:'wind',final:true,lines:['夜風のなかで、鈴が鳴る。','「離れていても、同じ星が見えるよ。」','黄色い布が、少年の記憶の端をかすめた。'],note:'庭の木と、ふたつの椅子。誰かが誰かを思うためには、この小さな星で十分だった。'}]},
 {id:'origin',name:'かえり星',caption:'表示されなかった目的地',chapter:'03',population:84,description:'知らないはずの道を、足が覚えている。',art:'assets/origin.png',width:2200,ground:.659,spawn:200,ship:130,skyColor:'#10182e',memoryStar:[.57,.15],requires:['minato','home'],memories:[
  {id:'origin-photo',x:1020,title:'写真のすみの少年',place:'古い校舎の前',object:'色あせた卒業写真',kind:'friends',sound:'bell',lines:['写真のすみに、白い髪の子がいる。','笑うのが少し苦手そうな顔。','少年は、写真の端をそっとなぞった。'],note:'この星に、僕はいた。写真のすみで、誰かの袖をつかんでいる。'},
  {id:'origin-window',x:1260,title:'窓から見ていた星',place:'家へつづく坂道',object:'青い窓枠',kind:'child',sound:'wind',lines:['いつも、あの窓から船を数えていた。','「あの船は、どこまで行くのかな。」','答えてくれた声の、あたたかさを覚えている。'],note:'青い窓。小さな机。宇宙は、ここから始まっていた。'},
  {id:'origin-promise',x:1570,title:'ほどけない約束',place:'最後まで灯りのあった家',object:'マフラーと同じ色の糸',kind:'family',sound:'cup',lines:['首もとに、やわらかな手がふれる。','「いつかこの星を離れても、いろんな星を見ておいで。」','「忘れられるのは、少し寂しいから。」','そうだ。僕は、覚えているために旅をしていた。'],note:'旅のはじまりは、約束だった。誰かがここにいたことを、忘れないための。'},
  {id:'origin-room',x:2020,title:'ただいま',place:'少年の部屋',object:'破れた記録帳の頁',kind:'room',sound:'sea',final:true,lines:['机の引き出しに、破れた頁があった。','「まだ、どこかで、だれかが夢を見ている。」','少年は窓辺に腰を下ろし、訪れた星をひとつずつ数えた。'],note:'誰もいない部屋に、「ただいま」と言った。窓の向こうに、覚えてきた星が灯っていた。'}]}
];
window.PERSONAL_MEMORIES=[
 {requires:'minato',title:'破れた最初の頁',text:'記録帳のはじめには、何もない。\nけれど、港で聞いた声に、胸が少し痛んだ。\n僕も誰かに、見送られたことがある。'},
 {requires:'home',title:'マフラーのぬくもり',text:'この黄色を、どこかで見た。\n出発の朝。首もとにふれた手。\n宇宙船の表示に、読めなかった星の名が浮かぶ。'},
 {requires:'origin',title:'旅をつづける理由',text:'星を起こすのではなく、星の夢を見る。\nここにいた人たちを、僕が覚えている。\n次は、どの星へ行こう。'}
];
