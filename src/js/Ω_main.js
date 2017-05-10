"use strict"

const TaskLister = new Vue({
	el: "#todo",

	data: {
		user: "Thom",
		hasTask: 0,
		newTask: "",
		taskList: [],
		thisTask: ""
	},


	methods: {
		addTask: function() {
			this.hasTask++

				var task = this.newTask.trim()

			if (task) {

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
					checked: false,
					edit: false
				})

				this.newTask = ""
			}
		},
		removeTask: function(task) {
			var index = this.taskList.indexOf(task)
			this.taskList.splice(index, 1)
			this.hasTask--
		},
		editTask: function(task) {
			var index = this.taskList.indexOf(task)
			this.taskList[index].edit = (this.taskList[index].edit) ? false : true
		},
		replaceTask: function(task) {
			var index = this.taskList.indexOf(task)
			this.taskList[index].text = TaskLister.thisTask
			this.taskList[index].edit = false
			this.taskList[index].checked = false
		},
		clearList: function() {
			this.taskList = []
			this.hasTask = 0
		},
		clearCompleted: function() {
			this.taskList = this.taskList.filter(this.inProgress)
		},
		selectAll: function(task) {
			var targetValue = this.areAllSelected ? false : true
			for (var i = 0; i < this.taskList.length; i++) {
				this.taskList[i].checked = targetValue
			}
		},
		reverseOrder: function() {
			this.taskList.reverse()
		},
		sortByDate: function() {
			this.taskList.sort(function(a, b) {
				return (a.added > b.added) ? 1 : ((b.added > a.added) ? -1 : 0)
			})
			this.taskList.reverse()
		},
		isCompleted: function(task) {
			return task.checked
		},
		inProgress: function(task) {
			return !this.isCompleted(task)
		}
	},
	computed: {
		areAllSelected: function() {
			return this.taskList.every(function(task) {
				return task.checked
			}) && this.taskList.length > 0
		},
		greeting: function() {
			let thisHour = new Date().getHours()
			if (thisHour < 12) {
				return 'Good morning'
			} else if (thisHour > 18) {
				return 'Good evening'
			} else if (thisHour > 21) {
				return 'Good night'
			} else {
				return 'Good afternoon'
			}
		},
		remainingTasks: function() {
			return this.taskList.filter(this.inProgress).length
		}
	}
})
