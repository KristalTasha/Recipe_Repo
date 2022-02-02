const adding = document.querySelectorAll('.newing');
       

        adding.forEach(addbtn => {
            addbtn.addEventListener("click", addNewIng)

        })

        
        function addNewIng() {
            
            var inputs = document.querySelectorAll("ingred");
            var theing = document.getElementById('theing');

                text = inputs.value;
                console.log(text)
            theing.innerHTML += "<li>" + text + "<li>";
           
               

         

            // var li = document.createElement("li");
            // var node = document.createTextNode(text);
            // li.appendChild(node);
            // document.getElementById("theing").appendChild(li);
        }

        // function addNewIng() {
            
        //     var inputs = document.querySelectorAll("ingred");

        //   text = inputs.innerHTML;
        //     var li = document.createElement("li");
        //     var node = document.createTextNode(text);
        //     li.appendChild(node);
        //     document.getElementById("theing").appendChild(li);
        // }
