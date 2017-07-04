(function() {

    var contacts = [
        {
            id: 1,
            name: "Friends",
            type: "Group",
            contacts: [
                {id: 2, name: "Udi", type: "Contact"},
                {id: 3, name: "Tommy", type: "Contact"},
                {
                    id: 6,
                    name: "Old Friends",
                    type: "Group",
                    contacts: [
                        {id: 7, name: "Itay", type: "Contact"},
                    ]
                },
            ]
        },
        {
            id: 4,
            name: "Family",
            type: "Group",
            contacts: [
                {id: 5, name: "Roni", type: "Contact"},
            ]
        },
        {id: 8, name: "Ori", type: "Contact"},
    ];


    //create title
    var title=document.createElement('h1');
    title.innerHTML='Contact Tree'
    document.body.appendChild(title);
    // create first level menu
    for(var i in contacts){
        var element=contacts[i];
        var div =document.createElement('div');
        var div2 =document.createElement('div');
        div2.innerHTML=contacts[i].name;
        //assigning class name for css
        if(contacts[i].type=='Group'){
            div.setAttribute('class','first list');
        }else{
            div.setAttribute('class','first');
        }
        div.setAttribute('id','first_'+contacts[i].id);
        document.body.appendChild(div);
        div.appendChild(div2);
        div.firstChild.addEventListener('click',(function(newLevel ){
            var s=newLevel;
            var el=document.getElementById('first_'+ s.id);
            //parameter for delete dom elements
            var close=1;
            return function() {

                if(close==1) {
                    //create second level
                    for (a in s.contacts) {
                        var element= s.contacts[a];
                        var div_ch = document.createElement('div');
                        div_ch.setAttribute('class','second');
                        div_ch.setAttribute('id','second_'+element.id);
                        div_ch.innerHTML = s.contacts[a].name;
                        //assigning cursor parametr
                        if(s.contacts[a].type=='Group'){
                            div_ch.style.cursor='pointer';
                        }else{
                            div_ch.style.cursor='text';
                        }
                        div_ch.addEventListener('click', (function(element){
                            var e=element;
                            var close2=1;
                            return function () {
                                //create third level
                                if(close2==1) {
                                    for (b in e.contacts) {
                                        var div_ch2 = document.createElement('div');
                                        div_ch2.setAttribute('class', 'second');
                                        div_ch2.innerHTML = e.contacts[b].name;
                                        document.getElementById('second_' + e.id).appendChild(div_ch2)

                                        close2=0;
                                    }
                                }else{
                                    div_ch.innerHTML= e.name;
                                    close2=1;
                                }
                            }
                        })(element))
                        el.appendChild(div_ch);

                    }
                    close=0;

                }else{
                   while (el.firstChild.nextElementSibling){
                       el.removeChild(el.lastChild);
                   }
                    close=1;

                }
            }
        })(element));



    }


})()