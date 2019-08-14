var todoStorage={
    collection: []
};
//Loading tasks from localStorage
todoStorage.init =function(){
    this.collection =JSON.parse(localStorage.getItem('todo') || '[]');
};
//Checking if the task is already there or not.
todoStorage.hasItem =function(label){
    return this.collection.some(function(item){
        return item.label === label;
    });
};
//Saving new Array as JSON Object into localStorage
todoStorage.save = function(){
    localStorage.setItem('todo', JSON.stringify(this.collection));
};
//Adding to task
todoStorage.add= function(label){
    if(this.hasItem(label)){ //Checking if the task is already there.
        return false;
    }
    this.collection.push({ //Otherwise add new task into Array
        label: label,
        status: 'uncompleted'
    });
    this.save(); //Saving new array
    return true;
};
//Delete the task
todoStorage.remove =function(label){
    if(!this.hasItem(label)){ //Checking if the task is there.
        return false;
    }
    //If it is there then delete it.
    this.collection.forEach(function(item, i){ 
       if(item.label === label){
           this.collection.splice(i,1); //Deleting the task on  'i' index.
       } 
    }.bind(this));
    this.save(); //Saving new Array
    return true;
};
//Changing Status
todoStorage.toggleStatus =function(label){
    if(!this.hasItem(label)){ //Checking it this exist
        return false;
    }
    this.collection.forEach(function(item, i){
       if(item.label === label){
           item.status = item.status === 'completed' ? 'uncompleted' : 'completed'; //Changing status if it is completed change it to uncompleted and vice versa
       } 
    });
    this.save();//Saving Tasks
    return true;
};
todoStorage.filter = function(status){
    if(status === 'all'){
        return this.collection;
    
    }
    return this.collection.filter(function(item){
        return item.status === status;
    });
};


