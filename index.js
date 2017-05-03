//Create a new Vue instance
new Vue({
	//Bind this Vue instance to our container div with an ID of todo
	el: "#todo",

	//This is where we will register the values that hold data for our application
	data: {

		newTask: "",
		taskList: []
	},

	//This is where we will hold the methods we want to use in our application
	methods: {
		addTask: function() {
			//trim() is used to remove whitespace from both ends of a string
			var task = this.newTask.trim();
			//if task is not an empty string
			if (task) {
				//Push an object containing the task to the taskList array
				this.taskList.push({
					text: task,
					checked: false
				});
				//Reset newTask to an empty string so the input field is cleared
				this.newTask = "";
			}
		},
		removeTask: function(task) {
			var index = this.taskList.indexOf(task);
			this.taskList.splice(index, 1);
		},
		clearList: function() {
			//Setting taskList to an empty array clears the whole list
			this.taskList = [];
		},
		selectAll: function(task) {
			//targetValue is set to the opposite of areAllSelected
			var targetValue = this.areAllSelected ? false : true;
			//we use a for loop to set the checked state of all items to the target value
			for (var i = 0; i < this.taskList.length; i++) {
				this.taskList[i].checked = targetValue;
			}
		}
	},
	computed: {
		areAllSelected: function() {
			//Check if every checked property returns true and if there is at least one to-do item
			return this.taskList.every(function(task) {
				return task.checked;
			}) && this.taskList.length > 0;
		},
	}
})
