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
				let date = new Date
				let d = {
					yr: date.getFullYear(),
					mo: (date.getMonth() <= 9) ? "0" + date.getMonth() : date.getMonth(),
					dy: (date.getDate() <= 9) ? "0" + date.getDate() : date.getDate(),
					hr: (date.getHours() <= 9) ? "0" + date.getHours() : date.getHours(),
					mi: (date.getMinutes() <= 9) ? "0" + date.getMinutes() : date.getMinutes(),
					se: (date.getSeconds() <= 9) ? "0" + date.getSeconds() : date.getSeconds()
				}
				let dateFormatted = d.dy + "/" + d.mo + "/" + d.yr + " (" + d.hr + ":" + d.mi + ":" + d.se + ")"

				this.taskList.push({
					text: task,
					added: dateFormatted,
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
		},
		reverseOrder: function() {
			console.log(this.taskList)
			this.taskList.reverse()
		},
		sortByDate: function() {
			console.log(this.taskList)
			this.taskList.sort(function(a, b) {
				return (a.added > b.added) ? 1 : ((b.added > a.added) ? -1 : 0);
			})
			this.taskList.reverse()
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
