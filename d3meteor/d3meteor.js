var Texts = new Meteor.Collection('texts');

if (Meteor.isClient) {
    
    Template.chat.texts = function() {
        // (2) コレクション内の全データを返す
        return Texts.find();
    };

    Template.navbar.events({
        'click #front' : function() {
            $("#main-content").html(Meteor.render(Template.frontContent));
        },       
        'click #twitter' : function() {
            $("#main-content").html(Meteor.render(Template.twitter));
        },
        'click #chat' : function() {
            $("#main-content").html(Meteor.render(Template.chat));
        }
    });
  
    Template.chat.events({
        'click #send' : function() {
            if (typeof console !== 'undefined') {
                console.log("Send button");
            }
            console.log("clicked");
            var t = $("#text").val();
            $("#text").val("");
            
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var ss = today.getSeconds();
            if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
            today = yyyy + "年" + mm + "月" + dd + "日 " + hh + ":" + ss;
            
            Texts.insert({name: '名無しさん', text: t, date: today});
            return false;
        } 
    });
}

if (Meteor.isServer) {
    
  Meteor.startup(function () {
    // code to run on server at startup
                // (3) 全データを消去する
    Texts.remove({});
    /*var data = [
        { name: 'しゅんぺい', text: 'ああ' },
        { name: 'たえこ', text: 'いい' },
        { name: 'こうたろう', text: 'うう' },
        { name: 'ちほ', text: 'ええ' }
    ];
    data.forEach(function(txt) {
        Texts.insert(txt);
    });*/
  });
}