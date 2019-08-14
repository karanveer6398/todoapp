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
todoStorage.filter = function(status){
    if(status === 'all'){
        return this.collection;
    }
    return this.collection.filter(function(item){
        return item.status === status;
    });
};