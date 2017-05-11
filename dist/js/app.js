"use strict";

// declare variables
var browserWidth = void 0,
    browserHeight = void 0,
    screenWidth = void 0,
    screenHeight = void 0,
    distance = void 0,
    target = void 0,
    device_type = void 0,
    device_name = void 0;

// What are the screen dimensions?
var screenSize = function screenSize() {
	screenWidth = screen.width;
	screenHeight = screen.height;
	// log for debug
	console.info(screenWidth, screenHeight);
};

// What are the browser dimensions?
var browser = {
	width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};

// Scroll to anchor
var scrollToAnchor = function scrollToAnchor(aid) {
	var aTag = document.querySelectorAll("a[name='" + aid + "']");
	aTag.forEach(function (obj) {
		document.querySelector('html,body').animate({
			scrollTop: obj.offset().top
		}, 900);
	});
};

// Make a button enabled
var enableButton = function enableButton(target) {
	document.querySelector(target).prop('disabled', false);
};

// Make a button disabled
var disableButton = function disableButton(target) {
	document.querySelector(target).prop('disabled', true);
};

// Destroy element
var destroyElement = function destroyElement(element) {
	document.querySelector(element).outerHTML = "";
};

// Get the value of the given parameter
var getURLParameter = function getURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	sURLVariables.forEach(function (object, index) {
		var sParameterName = sURLVariables[index].split('=');
		if (sParameterName[0] == sParam) {
			// Log for debug
			console.log('URL parameter:', sParameterName[1]);
			return sParameterName[1];
		}
	});
};

var urlContains = function urlContains(needle) {
	var haystack = window.location.href;
	return haystack.includes(needle) ? true : false;
};

var isAdult = function isAdult(data) {
	return data.age >= 18;
};

function scrollTo(element, to, duration) {
	var start = element.scrollTop,
	    change = to - start,
	    increment = 20;

	var animateScroll = function animateScroll(elapsedTime) {
		elapsedTime += increment;
		var position = easeInOut(elapsedTime, start, change, duration);
		element.scrollTop = position;
		if (elapsedTime < duration) {
			setTimeout(function () {
				animateScroll(elapsedTime);
			}, increment);
		}
	};

	animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
	currentTime /= duration / 2;
	if (currentTime < 1) {
		return change / 2 * currentTime * currentTime + start;
	}
	currentTime -= 1;
	return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

"use strict";

var TaskLister = new Vue({
	el: "#todo",

	data: {
		user: "Thom",
		hasTask: 0,
		newTask: "",
		taskList: [],
		thisTask: ""
	},

	created: function created() {
		var _this = this;

		var tasks = localStorage.getItem('tasks');

		// log for debug
		//console.log(taskJSON)
		if (tasks) {
			var taskJSON = JSON.parse(tasks);
			taskJSON.forEach(function (task) {
				// log for debug
				console.log(task);
				_this.taskList.push(task);
				_this.hasTask++;
			});
		}
	},

	methods: {
		addTask: function addTask() {
			this.hasTask++;

			var task = this.newTask.trim();

			if (task) {

				var date = new Date();
				var d = {
					yr: date.getFullYear(),
					mo: date.getMonth() <= 9 ? "0" + date.getMonth() : date.getMonth(),
					dy: date.getDate() <= 9 ? "0" + date.getDate() : date.getDate(),
					hr: date.getHours() <= 9 ? "0" + date.getHours() : date.getHours(),
					mi: date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes(),
					se: date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()
				};
				var dateFormatted = d.dy + "/" + d.mo + "/" + d.yr + " (" + d.hr + ":" + d.mi + ":" + d.se + ")";

				this.taskList.push({
					text: task,
					added: dateFormatted,
					checked: false,
					edit: false
				});

				this.storeData();

				this.newTask = "";
			}
		},
		removeTask: function removeTask(task) {
			var index = this.taskList.indexOf(task);
			this.taskList.splice(index, 1);
			this.hasTask--;
			this.storeData();
		},
		editTask: function editTask(task) {
			var index = this.taskList.indexOf(task);
			this.taskList[index].edit = this.taskList[index].edit ? false : true;
		},
		replaceTask: function replaceTask(task) {
			var index = this.taskList.indexOf(task);
			this.taskList[index].text = TaskLister.thisTask;
			this.taskList[index].edit = false;
			this.taskList[index].checked = false;
			this.storeData();
		},
		clearList: function clearList() {
			this.taskList = [];
			this.hasTask = 0;
			this.storeData();
		},
		clearCompleted: function clearCompleted() {
			this.taskList = this.taskList.filter(this.inProgress);
			this.storeData();
		},
		selectAll: function selectAll(task) {
			var targetValue = this.areAllSelected ? false : true;
			for (var i = 0; i < this.taskList.length; i++) {
				this.taskList[i].checked = targetValue;
			}
		},
		reverseOrder: function reverseOrder() {
			this.taskList.reverse();
			this.storeData();
		},
		sortByDate: function sortByDate() {
			this.taskList.sort(function (a, b) {
				return a.added > b.added ? 1 : b.added > a.added ? -1 : 0;
			});
			this.taskList.reverse();
			this.storeData();
		},
		isCompleted: function isCompleted(task) {
			return task.checked;
		},
		inProgress: function inProgress(task) {
			return !this.isCompleted(task);
		},
		storeData: function storeData() {
			// log for debug
			console.log('Storing data to localStorage');
			localStorage.setItem('tasks', JSON.stringify(TaskLister.taskList));
		}
	},
	computed: {
		areAllSelected: function areAllSelected() {
			return this.taskList.every(function (task) {
				return task.checked;
			}) && this.taskList.length > 0;
		},
		greeting: function greeting() {
			var thisHour = new Date().getHours();
			if (thisHour < 12) {
				return 'Good morning';
			} else if (thisHour > 18) {
				return 'Good evening';
			} else if (thisHour > 21) {
				return 'Good night';
			} else {
				return 'Good afternoon';
			}
		},
		remainingTasks: function remainingTasks() {
			return this.taskList.filter(this.inProgress).length;
		}
	}
});
//# sourceMappingURL=app.js.map
