let taskList = [];
const taskDom = document.getElementById('taskList');
const inputDom = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const filterBtns = document.querySelectorAll('.filter-box button');

// 新增任务，表单校验：空值提示
addBtn.onclick = function () {
    const val = inputDom.value.trim();
    if (!val) {
        alert('任务不能为空！');
        return;
    }
    taskList.push({ name: val, done: false });
    inputDom.value = '';
    render('all');
}

// 渲染函数，筛选逻辑
function render(type) {
    taskDom.innerHTML = '';
    let showArr = [];
    if (type === 'all') showArr = taskList;
    else if (type === 'done') showArr = taskList.filter(item => item.done);
    else if (type === 'undone') showArr = taskList.filter(item => !item.done);

    showArr.forEach((item) => {
        const li = document.createElement('li');
        li.className = item.done ? 'done' : '';
        li.innerHTML = `
            <span>${item.name}</span>
            <button class="toggle">切换完成</button>
        `
        li.querySelector('.toggle').onclick = () => {
            item.done = !item.done;
            render(type);
        }
        taskDom.appendChild(li);
    })
}

filterBtns.forEach(btn => {
    btn.onclick = function () {
        render(this.dataset.filter);
    }
})
render('all');

// ✅ 这个就是你要抓包的 fetch 请求！写在这里，打开页面自动发请求
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(res => res.json())
.then(data => {
    console.log('fetch拿到数据：', data);
})
.catch(err => console.log(err));