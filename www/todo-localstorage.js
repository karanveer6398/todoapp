var todoStorage={
    collection: []
};
//Loading tasks from localStorage
todoStorage.init =function(){
    this.collection =JSON.parse(localStorage.getItem('todo') || '[]');
};

