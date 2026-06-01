const tasks = [
    {
        id: 1,
        title: '调研郑州高校周边打印店价格',
        category: '线下调研',
        city: '郑州',
        bounty: 80,
        deadline: '2 天内',
        status: '招募中',
        skills: ['信息采集', '表格整理', '拍照记录'],
        description: '走访 5 家高校周边打印店，记录黑白/彩色打印、装订和扫描价格，并提交照片证明。',
        requirements: ['提交价格表 CSV 或 Excel', '每家店至少 1 张门头照片', '备注营业时间和排队情况']
    },
    {
        id: 2,
        title: '整理一组前端项目 README',
        category: '内容整理',
        city: '远程',
        bounty: 120,
        deadline: '3 天内',
        status: '招募中',
        skills: ['Markdown', '技术写作', '项目复盘'],
        description: '根据现有静态页面和源码，为 3 个项目补齐功能介绍、技术点、运行方式和展示链接。',
        requirements: ['README 结构统一', '避免夸张表述', '每个项目写清楚核心交互']
    },
    {
        id: 3,
        title: '验证天气页面在手机端的布局',
        category: '产品反馈',
        city: '远程',
        bounty: 60,
        deadline: '24 小时内',
        status: '审核中',
        skills: ['移动端测试', '截图标注', '体验反馈'],
        description: '使用不同宽度浏览器检查天气项目在手机端是否出现文字溢出、按钮遮挡或卡片错位。',
        requirements: ['提交 3 张以上截图', '列出复现宽度', '给出可执行修改建议']
    },
    {
        id: 4,
        title: '采集 10 条电影平台评论样例',
        category: '数据核验',
        city: '远程',
        bounty: 90,
        deadline: '2 天内',
        status: '招募中',
        skills: ['数据整理', '内容审核', '去重'],
        description: '为电影播放平台毕设准备评论样例，要求内容健康、长度适中、风格自然。',
        requirements: ['字段包含影片名、评分、评论、标签', '去除重复和敏感内容', '提交 JSON 文件']
    },
    {
        id: 5,
        title: '拍摄校园公告栏信息结构',
        category: '线下调研',
        city: '新乡',
        bounty: 70,
        deadline: '本周内',
        status: '已分配',
        skills: ['现场记录', '信息归纳', '照片采集'],
        description: '观察校园公告栏信息分类方式，为教务系统通知模块提供页面结构参考。',
        requirements: ['拍摄 6 张以上照片', '总结常见公告类型', '说明信息层级']
    },
    {
        id: 6,
        title: '检查数据看板指标命名是否清楚',
        category: '产品反馈',
        city: '远程',
        bounty: 50,
        deadline: '24 小时内',
        status: '招募中',
        skills: ['数据产品', '可读性检查', '反馈整理'],
        description: '阅读数据看板页面，判断 KPI、图表标题和筛选项是否容易理解。',
        requirements: ['列出 5 条以上反馈', '区分问题和建议', '给出优先级']
    }
];

const records = [
    {
        title: '天气页面移动端验收',
        owner: '远程测试者 A',
        amount: 60,
        result: '发现 2 处按钮换行问题，补充 390px 和 430px 截图。',
        time: '今天 10:20',
        state: '已通过'
    },
    {
        title: 'README 结构统一',
        owner: '内容协作者 B',
        amount: 120,
        result: '完成 3 个项目 README，统一了功能、技术点和本地运行说明。',
        time: '昨天 18:40',
        state: '已结算'
    },
    {
        title: '打印店价格调研样例',
        owner: '郑州协作者 C',
        amount: 80,
        result: '提交 5 家店价格表和照片，补充了营业时间备注。',
        time: '昨天 12:05',
        state: '复核中'
    }
];

const categories = ['全部', ...Array.from(new Set(tasks.map((task) => task.category)))];

let activeCategory = '全部';
let searchKeyword = '';

const $ = (selector) => document.querySelector(selector);

function money(value) {
    return `¥${value.toLocaleString('zh-CN')}`;
}

function renderStats() {
    const openCount = tasks.filter((task) => task.status === '招募中').length;
    const cities = new Set(tasks.map((task) => task.city));
    const bountyTotal = tasks.reduce((sum, task) => sum + task.bounty, 0);

    $('#open-count').textContent = openCount;
    $('#record-count').textContent = records.length;
    $('#city-count').textContent = cities.size;
    $('#bounty-total').textContent = money(bountyTotal);
}

function renderFilters() {
    $('#filter-tabs').innerHTML = categories
        .map((category) => `<button class="${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">${category}</button>`)
        .join('');

    document.querySelectorAll('[data-category]').forEach((button) => {
        button.addEventListener('click', () => {
            activeCategory = button.dataset.category;
            renderFilters();
            renderTasks();
        });
    });
}

function getVisibleTasks() {
    const keyword = searchKeyword.toLowerCase();
    return tasks.filter((task) => {
        const categoryMatch = activeCategory === '全部' || task.category === activeCategory;
        const textMatch = [task.title, task.city, task.description, ...task.skills]
            .join(' ')
            .toLowerCase()
            .includes(keyword);
        return categoryMatch && textMatch;
    });
}

function renderTasks() {
    const visibleTasks = getVisibleTasks();
    $('#tasks-container').innerHTML = visibleTasks.length
        ? visibleTasks.map((task) => `
            <article class="task-card">
                <div class="task-card-head">
                    <span>${task.category}</span>
                    <b>${task.status}</b>
                </div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="task-meta">
                    <span>${task.city}</span>
                    <span>${task.deadline}</span>
                    <strong>${money(task.bounty)}</strong>
                </div>
                <div class="skill-row">
                    ${task.skills.map((skill) => `<span>${skill}</span>`).join('')}
                </div>
                <button class="secondary-btn full-btn" type="button" data-task-id="${task.id}">查看详情</button>
            </article>
        `).join('')
        : '<div class="empty-state">没有匹配的任务，换个关键词试试。</div>';

    document.querySelectorAll('[data-task-id]').forEach((button) => {
        button.addEventListener('click', () => openTaskModal(Number(button.dataset.taskId)));
    });
}

function renderRecords() {
    $('#records-container').innerHTML = records.map((record) => `
        <article class="record-card">
            <div>
                <span>${record.state}</span>
                <strong>${money(record.amount)}</strong>
            </div>
            <h3>${record.title}</h3>
            <p>${record.result}</p>
            <small>${record.owner} · ${record.time}</small>
        </article>
    `).join('');
}

function openTaskModal(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    $('#modal-category').textContent = task.category;
    $('#modal-title').textContent = task.title;
    $('#modal-description').textContent = task.description;
    $('#modal-meta').innerHTML = `
        <span>${task.city}</span>
        <span>${task.deadline}</span>
        <span>${task.status}</span>
        <strong>${money(task.bounty)}</strong>
    `;
    $('#modal-requirements').innerHTML = task.requirements.map((item) => `<li>${item}</li>`).join('');
    $('#task-modal').hidden = false;
}

function closeModal() {
    $('#task-modal').hidden = true;
}

function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.hidden = true;
    }, 2400);
}

function bindEvents() {
    $('#task-search').addEventListener('input', (event) => {
        searchKeyword = event.target.value.trim();
        renderTasks();
    });

    document.querySelectorAll('[data-close="modal"]').forEach((element) => {
        element.addEventListener('click', closeModal);
    });

    document.querySelectorAll('[data-action="publish"]').forEach((button) => {
        button.addEventListener('click', () => showToast('这是静态原型：发布任务入口已预留，可继续接入表单。'));
    });

    document.querySelector('[data-action="apply"]').addEventListener('click', () => {
        closeModal();
        showToast('申请动作已模拟完成：真实项目中可接入登录和任务状态接口。');
    });
}

function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderFilters();
    renderTasks();
    renderRecords();
    bindEvents();
    initScroll();
});
