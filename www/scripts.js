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











