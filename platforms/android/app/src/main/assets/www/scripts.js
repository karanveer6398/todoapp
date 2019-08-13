var todo = {
    filterFlag: 'all',
    events: []
};

document.addEventListener('init', function(event){
    var view = event.target.id;
    
    if(view === 'menu' || view === "list"){
        todo[view + 'Init'](event.target);
    }
},false);

todo.listInit = function(target){
    this.list = document.querySelector('#todo-list');
    target.querySelector('#splitter-toggle').addEventListener('click', function(){
        document.querySelector('#splitter-menu').open();
    });
    target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    
    todoStorage.init();
    this.refresh();
}
//Pop up for new task
todo.addItemPrompt =function(){
    ons.notification.prompt('Enter your Task.', {
        title: 'New Item',//Insert new to-do item label
        cancelable: true,
        
        callback: function(label){
            if(label === '' || label === null){ //if the label in null or empty
                return; // Do nothing
            }
            if(todoStorage.add(label)){ //if label Text is there then add the task
                this.refresh(); //Refreshing the list
            }
            else{
                ons.notification.alert('Failed to add item to the todo list'); //if the task is already in storage
            }
        }.bind(this)
    });
}
todo.refresh = function(){
    var items = todoStorage.filter(this.filterFlag);
    
    this.list.innerHTML = items.map(function(item){ //Populating items into list
        return document.querySelector('#todo-list-item').innerHTML
            .replace('{{label}}', item.label)
            .replace('{{checked}}', item.status === 'completed' ? 'checked' : '');
    }).join('');
    
    var children =this.list.children;
    
    this.events.forEach(function(event,i){
       event.element.removeEventListener('click', event.function); 
    });
    
    this.events =[];
    
    var event = {};
    items.forEach(function(item,i){
        event ={
            element: children[i].querySelector('ons-input'),
            function: this.toggleStatus.bind(this, item.label)
        };
        this.events.push(event);
        event.element.addEventListener('click', event.function);
       
        event = {
           element: children[i].querySelector('ons-icon'),
           function: this.removeItemPrompt.bind(this,item.label)
        };
       this.events.push(event);
       event.element.addEventListener('click', event.function);
    }.bind(todo));
};

todo.toggleStatus = function(label){
    if(todoStorage.toggleStatus(label)){
        this.refresh();
    }
    else{
        ons.notification.alert('Failed to change the status of the selected item!');
    }
}
//Removing pop up
todo.removeItemPrompt = function(label){
    //Prompting message
    ons.notification.confirm('Are you sure to remove '+label+ ' from the todo list?',{
        title: 'Remove item?',
        
        callback: function(answer){
            if (answer === 1){ //If user press OK
                if(todoStorage.remove(label)){// Then remove the task
                    this.refresh(); //and refresh the list
                }
                else{
                    ons.notification.alert('Failed to remove item from todo list!'); //if some error occurs
                }
            }
        }.bind(this)
    });
};








