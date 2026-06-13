/* ================================================================
   Task Collaboration Lab - script.js
   功能：任务管理 / 交付记录 / 数据持久化 / 状态流转
   ================================================================ */

// -------------------- 初始任务数据 (12条) --------------------
const DEFAULT_TASKS = [
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
        requirements: ['提交价格表 CSV 或 Excel', '每家店至少 1 张门头照片', '备注营业时间和排队情况'],
        createdAt: '2026-06-08'
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
        requirements: ['README 结构统一', '避免夸张表述', '每个项目写清楚核心交互'],
        createdAt: '2026-06-09'
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
        requirements: ['提交 3 张以上截图', '列出复现宽度', '给出可执行修改建议'],
        createdAt: '2026-06-07'
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
        requirements: ['字段包含影片名、评分、评论、标签', '去除重复和敏感内容', '提交 JSON 文件'],
        createdAt: '2026-06-10'
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
        requirements: ['拍摄 6 张以上照片', '总结常见公告类型', '说明信息层级'],
        createdAt: '2026-06-06'
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
        requirements: ['列出 5 条以上反馈', '区分问题和建议', '给出优先级'],
        createdAt: '2026-06-10'
    },
    {
        id: 7,
        title: '上海社区菜场价格抽样',
        category: '线下调研',
        city: '上海',
        bounty: 100,
        deadline: '3 天内',
        status: '招募中',
        skills: ['信息采集', '表格整理', '拍照记录'],
        description: '选取上海 3 个社区菜场，记录 10 种常见蔬菜水果价格，对比线上线下价差。',
        requirements: ['每种商品记录价格和摊位号', '提交对比表格', '附现场照片不少于 5 张'],
        createdAt: '2026-06-11'
    },
    {
        id: 8,
        title: '整理产品设计模式库',
        category: '内容整理',
        city: '远程',
        bounty: 150,
        deadline: '1 周内',
        status: '已分配',
        skills: ['技术写作', '信息归纳', '产品设计'],
        description: '从主流应用中收集 20 个常见设计模式案例，分类归档并标注使用场景。',
        requirements: ['每个模式含截图和说明', '按导航/表单/列表/反馈分类', '提交 Markdown 文档'],
        createdAt: '2026-06-05'
    },
    {
        id: 9,
        title: '北京地铁站内导航标识可用性观察',
        category: '线下调研',
        city: '北京',
        bounty: 120,
        deadline: '2 周内',
        status: '招募中',
        skills: ['可用性测试', '现场记录', '拍照记录'],
        description: '选取 5 个换乘站，观察并记录站内标识的清晰度、连续性和多语言覆盖情况。',
        requirements: ['每个站点 3 张标识照片', '绘制简易导航路径图', '指出至少 3 处改进点'],
        createdAt: '2026-06-11'
    },
    {
        id: 10,
        title: '校对译文并标注文化差异点',
        category: '内容整理',
        city: '远程',
        bounty: 200,
        deadline: '1 周内',
        status: '已完成',
        skills: ['技术写作', '内容审核', '跨文化理解'],
        description: '校对一份约 5000 字的英中产品说明译文，标注文化差异和本地化建议。',
        requirements: ['提交校对后的译文', '差异点用批注形式标注', '给出至少 5 条本地化建议'],
        createdAt: '2026-06-03'
    },
    {
        id: 11,
        title: '验证产品注册流程在 iOS 下的表现',
        category: '产品反馈',
        city: '远程',
        bounty: 80,
        deadline: '2 天内',
        status: '已完成',
        skills: ['移动端测试', '截图标注', '体验反馈'],
        description: '在 iOS 最新系统上完整走通注册-登录-找回密码流程，记录每一步的界面和异常。',
        requirements: ['截取每一步界面', '标注不符合 iOS 规范的交互', '提交 8 条以上测试记录'],
        createdAt: '2026-06-04'
    },
    {
        id: 12,
        title: '杭州景区游客中心信息获取测试',
        category: '线下调研',
        city: '杭州',
        bounty: 90,
        deadline: '2 周内',
        status: '已完成',
        skills: ['信息采集', '现场记录', '问卷设计'],
        description: '前往杭州 3 个主要景区游客中心，以普通游客身份获取交通、住宿和票务信息并评估服务质量。',
        requirements: ['记录信息获取完整流程', '评估响应速度和服务态度', '提交调研报告不少于 500 字'],
        createdAt: '2026-06-01'
    }
];

// -------------------- 初始交付记录 --------------------
const DEFAULT_RECORDS = [
    {
        id: 101,
        taskId: 10,
        title: '校对译文并标注文化差异点',
        owner: '内容审核员 D',
        amount: 200,
        result: '完成 5000 字校对，发现 12 处文化差异点，提供 6 条本地化建议。',
        time: '6 月 10 日 15:30',
        state: '已通过'
    },
    {
        id: 102,
        taskId: 11,
        title: '验证产品注册流程在 iOS 下的表现',
        owner: '移动端测试者 E',
        amount: 80,
        result: '完成 iOS 全流程测试，截取 12 张界面图，标注 3 处不符合规范的交互。',
        time: '6 月 9 日 11:00',
        state: '已通过'
    },
    {
        id: 103,
        taskId: 12,
        title: '杭州景区游客中心信息获取测试',
        owner: '杭州调研员 F',
        amount: 90,
        result: '完成 3 个景区游客中心调研，提交 600 字报告及 10 张现场照片。',
        time: '6 月 8 日 16:20',
        state: '已通过'
    },
    {
        id: 104,
        taskId: 3,
        title: '验证天气页面在手机端的布局',
        owner: '远程测试者 A',
        amount: 60,
        result: '发现 2 处按钮换行问题，补充 390px 和 430px 截图。',
        time: '6 月 12 日 10:20',
        state: '待审核'
    }
];

// -------------------- LocalStorage 持久化 --------------------
const LS_TASKS_KEY = 'tasklab_tasks';
const LS_RECORDS_KEY = 'tasklab_records';
const LS_APP_KEY = 'tasklab_applications';

function loadFromStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('LocalStorage 读取失败:', key, e);
    }
    return fallback;
}

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('LocalStorage 写入失败:', key, e);
    }
}

function mergeTasks(defaultTasks, storedTasks) {
    const map = new Map();
    // 以默认数据为基准
    defaultTasks.forEach((t) => map.set(t.id, t));
    // 存储数据覆盖（用户修改优先）
    storedTasks.forEach((t) => map.set(t.id, t));
    // 合并后按 id 排序
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
}

function mergeRecords(defaultRecords, storedRecords) {
    const map = new Map();
    defaultRecords.forEach((r) => map.set(r.id, r));
    storedRecords.forEach((r) => map.set(r.id, r));
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
}

// 初始化数据
let tasks = loadFromStorage(LS_TASKS_KEY, DEFAULT_TASKS);
let records = loadFromStorage(LS_RECORDS_KEY, DEFAULT_RECORDS);
let applications = loadFromStorage(LS_APP_KEY, []);

// 首次加载时合并可能的新增默认数据
const storedTasks = loadFromStorage(LS_TASKS_KEY, null);
const storedRecords = loadFromStorage(LS_RECORDS_KEY, null);
if (storedTasks) {
    tasks = mergeTasks(DEFAULT_TASKS, storedTasks);
}
if (storedRecords) {
    records = mergeRecords(DEFAULT_RECORDS, storedRecords);
}
saveToStorage(LS_TASKS_KEY, tasks);
saveToStorage(LS_RECORDS_KEY, records);

// -------------------- 快捷工具 --------------------
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function money(value) {
    return '¥' + value.toLocaleString('zh-CN');
}

function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
}

function nowStr() {
    const d = new Date();
    return d.getMonth() + 1 + ' 月 ' + d.getDate() + ' 日 ' +
        String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0');
}

// -------------------- 状态映射 --------------------
const STATUS_MAP = {
    '招募中': { cls: 'status-open', label: '招募中' },
    '已分配': { cls: 'status-assigned', label: '已分配' },
    '审核中': { cls: 'status-review', label: '审核中' },
    '已完成': { cls: 'status-done', label: '已完成' }
};

function statusBadge(status) {
    const s = STATUS_MAP[status] || { cls: 'status-open', label: status };
    return '<span class="status-badge ' + s.cls + '">' + s.label + '</span>';
}

// -------------------- 统计渲染 --------------------
function renderStats() {
    const openCount = tasks.filter((t) => t.status === '招募中').length;
    const today = todayStr();
    const todayCount = tasks.filter((t) => t.createdAt === today).length;
    const deliveryCount = records.length;
    const bountyTotal = tasks.reduce((sum, t) => sum + t.bounty, 0);
    const completedCount = tasks.filter((t) => t.status === '已完成').length;
    const cities = new Set(tasks.map((t) => t.city));
    const categorySet = new Set(tasks.map((t) => t.category));

    // Hero 面板
    $('#stat-open-count').textContent = openCount;
    $('#stat-today-count').textContent = todayCount;
    $('#stat-delivery-count').textContent = deliveryCount;
    $('#stat-bounty-total').textContent = money(bountyTotal);

    // Stats band
    $('#band-category-count').textContent = categorySet.size;
    $('#band-city-count').textContent = cities.size;
    $('#band-completed-count').textContent = completedCount;
}

// -------------------- 筛选渲染 --------------------
let activeCategory = '全部';
let searchKeyword = '';

function getAllCategories() {
    return ['全部'].concat(
        Array.from(new Set(tasks.map((t) => t.category)))
    );
}

function renderFilters() {
    const cats = getAllCategories();
    $('#filter-tabs').innerHTML = cats
        .map((cat) => '<button class="' + (cat === activeCategory ? 'active' : '') +
            '" type="button" data-category="' + cat + '">' + cat + '</button>')
        .join('');

    $$('[data-category]').forEach((btn) => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            renderFilters();
            renderTasks();
        });
    });
}

function getVisibleTasks() {
    const kw = searchKeyword.toLowerCase();
    return tasks.filter((t) => {
        if (t.status === '已完成') return false; // 已完成不在任务池显示
        const catMatch = activeCategory === '全部' || t.category === activeCategory;
        const textMatch = [t.title, t.city, t.description].concat(t.skills)
            .join(' ').toLowerCase().includes(kw);
        return catMatch && textMatch;
    });
}

// -------------------- 任务卡片渲染 --------------------
function renderTasks() {
    const visible = getVisibleTasks();
    const container = $('#tasks-container');

    if (visible.length === 0) {
        container.innerHTML = '<div class="empty-state">没有匹配的任务，换个关键词试试。</div>';
        return;
    }

    container.innerHTML = visible.map((task) => {
        const canApply = task.status === '招募中';
        const canDeliver = task.status === '已分配';
        const actionHtml = canApply
            ? '<button class="primary-btn full-btn" type="button" data-apply="' + task.id + '">申请认领</button>'
            : canDeliver
                ? '<button class="secondary-btn full-btn" type="button" data-deliver="' + task.id + '">提交交付</button>'
                : '<button class="secondary-btn full-btn" type="button" data-task-id="' + task.id + '">查看详情</button>';

        return '<article class="task-card" data-status="' + task.status + '">' +
            '<div class="task-card-head">' +
            '<span>' + task.category + '</span>' +
            statusBadge(task.status) +
            '</div>' +
            '<h3>' + task.title + '</h3>' +
            '<p>' + task.description + '</p>' +
            '<div class="task-meta">' +
            '<span>' + task.city + '</span>' +
            '<span>' + task.deadline + '</span>' +
            '<strong>' + money(task.bounty) + '</strong>' +
            '</div>' +
            '<div class="skill-row">' +
            task.skills.map((s) => '<span>' + s + '</span>').join('') +
            '</div>' +
            actionHtml +
            '</article>';
    }).join('');

    // 绑定事件
    $$('[data-task-id]').forEach((btn) => {
        btn.addEventListener('click', () => openTaskModal(Number(btn.dataset.taskId)));
    });
    $$('[data-apply]').forEach((btn) => {
        btn.addEventListener('click', () => openApplyModal(Number(btn.dataset.apply)));
    });
    $$('[data-deliver]').forEach((btn) => {
        btn.addEventListener('click', () => submitDelivery(Number(btn.dataset.deliver)));
    });
}

// -------------------- 交付记录渲染 --------------------
function getActiveRecords() {
    return records.filter((r) => r.state !== '已驳回');
}

function renderRecords() {
    const activeRecords = getActiveRecords();
    const container = $('#records-container');

    if (activeRecords.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无交付记录。</div>';
        return;
    }

    container.innerHTML = activeRecords.map((record) => {
        const isPending = record.state === '待审核';
        const actionsHtml = isPending
            ? '<div class="record-actions">' +
              '<button class="small-btn approve-btn" type="button" data-approve="' + record.id + '">通过</button>' +
              '<button class="small-btn reject-btn" type="button" data-reject="' + record.id + '">驳回</button>' +
              '</div>'
            : '';

        return '<article class="record-card">' +
            '<div>' +
            '<span class="record-state ' + (record.state === '已通过' ? 'state-passed' : record.state === '待审核' ? 'state-pending' : 'state-closed') + '">' + record.state + '</span>' +
            '<strong>' + money(record.amount) + '</strong>' +
            '</div>' +
            '<h3>' + record.title + '</h3>' +
            '<p>' + record.result + '</p>' +
            '<small>' + record.owner + ' · ' + record.time + '</small>' +
            actionsHtml +
            '</article>';
    }).join('');

    // 审核操作
    $$('[data-approve]').forEach((btn) => {
        btn.addEventListener('click', () => approveRecord(Number(btn.dataset.approve)));
    });
    $$('[data-reject]').forEach((btn) => {
        btn.addEventListener('click', () => rejectRecord(Number(btn.dataset.reject)));
    });
}

// -------------------- 已完成项目渲染 --------------------
function renderCompleted() {
    const completed = tasks.filter((t) => t.status === '已完成');
    const container = $('#completed-container');

    if (completed.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无已完成项目，完成交付审核后将出现在这里。</div>';
        return;
    }

    container.innerHTML = completed.map((task) => {
        return '<article class="completed-card">' +
            '<div class="completed-head">' +
            '<span>' + task.category + '</span>' +
            statusBadge(task.status) +
            '<button class="small-btn archive-btn" type="button" data-archive="' + task.id + '">归档</button>' +
            '</div>' +
            '<h3>' + task.title + '</h3>' +
            '<p>' + task.description + '</p>' +
            '<div class="task-meta">' +
            '<span>' + task.city + '</span>' +
            '<span>' + task.deadline + '</span>' +
            '<strong>' + money(task.bounty) + '</strong>' +
            '</div>' +
            '<div class="skill-row">' +
            task.skills.map((s) => '<span>' + s + '</span>').join('') +
            '</div>' +
            '</article>';
    }).join('');

    $$('[data-archive]').forEach((btn) => {
        btn.addEventListener('click', () => archiveTask(Number(btn.dataset.archive)));
    });
}

// -------------------- 任务详情 Modal --------------------
function openTaskModal(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    $('#modal-category').textContent = task.category;
    $('#modal-title').textContent = task.title;
    $('#modal-description').textContent = task.description;
    $('#modal-meta').innerHTML =
        '<span>' + task.city + '</span>' +
        '<span>' + task.deadline + '</span>' +
        statusBadge(task.status) +
        '<strong>' + money(task.bounty) + '</strong>';
    $('#modal-requirements').innerHTML = task.requirements
        .map((item) => '<li>' + item + '</li>').join('');

    // 按钮状态控制
    const applyBtn = $('#modal-apply-btn');
    const deliverBtn = $('#modal-deliver-btn');
    const statusLabel = $('#modal-status-label');

    if (task.status === '招募中') {
        applyBtn.hidden = false;
        applyBtn.textContent = '申请认领';
        applyBtn.onclick = () => { closeModal('task-modal'); openApplyModal(task.id); };
        deliverBtn.hidden = true;
        statusLabel.hidden = true;
    } else if (task.status === '已分配') {
        applyBtn.hidden = true;
        deliverBtn.hidden = false;
        deliverBtn.textContent = '提交交付';
        deliverBtn.onclick = () => { closeModal('task-modal'); submitDelivery(task.id); };
        statusLabel.hidden = true;
    } else if (task.status === '审核中') {
        applyBtn.hidden = true;
        deliverBtn.hidden = true;
        statusLabel.hidden = false;
        statusLabel.textContent = '审核中';
        statusLabel.className = 'status-label status-review';
    } else if (task.status === '已完成') {
        applyBtn.hidden = true;
        deliverBtn.hidden = true;
        statusLabel.hidden = false;
        statusLabel.textContent = '已完成';
        statusLabel.className = 'status-label status-done';
    }

    $('#task-modal').hidden = false;
}

function closeModal(modalId) {
    $('#' + modalId).hidden = true;
}

// -------------------- 申请认领 --------------------
let pendingApplyTaskId = null;

function openApplyModal(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    pendingApplyTaskId = taskId;
    $('#confirm-title').textContent = task.title;
    $('#confirm-category').textContent = task.category;
    $('#confirm-city').textContent = task.city;
    $('#confirm-bounty').textContent = money(task.bounty);
    $('#confirm-deadline').textContent = task.deadline;
    $('#apply-modal').hidden = false;
}

function confirmApply() {
    if (!pendingApplyTaskId) return;
    const task = tasks.find((t) => t.id === pendingApplyTaskId);
    if (!task || task.status !== '招募中') {
        showToast('该任务已无法认领');
        return;
    }

    // 更新任务状态
    task.status = '已分配';

    // 记录申请
    applications.push({
        taskId: task.id,
        taskTitle: task.title,
        time: nowStr(),
        date: todayStr()
    });
    saveToStorage(LS_APP_KEY, applications);

    persistAndRefresh();
    closeModal('apply-modal');
    pendingApplyTaskId = null;
    showToast('任务认领成功！状态已更新为"已分配"。');
}

// -------------------- 提交交付 --------------------
function submitDelivery(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status !== '已分配') {
        showToast('该任务当前不可提交交付');
        return;
    }

    // 变更任务状态
    task.status = '审核中';

    // 自动生成交付记录
    const newRecord = {
        id: Date.now(),
        taskId: task.id,
        title: task.title,
        owner: '协作者 ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        amount: task.bounty,
        result: '已提交交付物，等待审核。任务：' + task.title,
        time: nowStr(),
        state: '待审核'
    };
    records.push(newRecord);

    persistAndRefresh();
    showToast('交付已提交！任务进入审核中状态，已自动生成交付记录。');
}

// -------------------- 审核操作 --------------------
function approveRecord(recordId) {
    const record = records.find((r) => r.id === recordId);
    if (!record || record.state !== '待审核') return;

    record.state = '已通过';

    // 对应的任务改为已完成
    const task = tasks.find((t) => t.id === record.taskId);
    if (task && task.status === '审核中') {
        task.status = '已完成';
    }

    persistAndRefresh();
    showToast('交付审核通过！任务已标记为"已完成"。');
}

function rejectRecord(recordId) {
    const record = records.find((r) => r.id === recordId);
    if (!record || record.state !== '待审核') return;

    record.state = '已驳回';

    // 对应的任务退回招募中
    const task = tasks.find((t) => t.id === record.taskId);
    if (task && task.status === '审核中') {
        task.status = '招募中';
    }

    persistAndRefresh();
    showToast('交付已驳回，任务退回"招募中"。');
}

// -------------------- 归档 --------------------
function archiveTask(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status !== '已完成') return;

    // 从任务列表中移除
    tasks = tasks.filter((t) => t.id !== taskId);
    persistAndRefresh();
    showToast('任务已归档。');
}

// -------------------- 发布任务 --------------------
function openPublishModal() {
    resetPublishForm();
    $('#publish-modal').hidden = false;
}

function resetPublishForm() {
    $('#publish-form').reset();
    // 清除标签选中
    $$('#pub-skills .tag-option.active').forEach((el) => el.classList.remove('active'));
    // 清除错误信息
    $$('#publish-form .form-error').forEach((el) => el.textContent = '');
    // 重置字数统计
    $('#hint-description').textContent = '0/20 字';
    $$('#publish-form .form-group').forEach((el) => el.classList.remove('has-error'));
}

function getSelectedSkills() {
    const selected = [];
    $$('#pub-skills .tag-option.active').forEach((el) => {
        selected.push(el.dataset.tag);
    });
    return selected;
}

function showFieldError(fieldId, message) {
    const el = $('#' + fieldId);
    const errorEl = $('#error-' + fieldId.split('-')[1]);
    if (errorEl) errorEl.textContent = message;
    el.closest('.form-group') && el.closest('.form-group').classList.add('has-error');
}

function clearFieldError(fieldId) {
    const el = $('#' + fieldId);
    const errorEl = $('#error-' + fieldId.split('-')[1]);
    if (errorEl) errorEl.textContent = '';
    el.closest('.form-group') && el.closest('.form-group').classList.remove('has-error');
}

function handlePublishSubmit(e) {
    e.preventDefault();

    let valid = true;

    // 清楚所有错误
    $$('#publish-form .form-error').forEach((el) => el.textContent = '');
    $$('#publish-form .form-group').forEach((el) => el.classList.remove('has-error'));

    const title = $('#pub-title').value.trim();
    const category = $('#pub-category').value;
    const city = $('#pub-city').value;
    const bountyVal = $('#pub-bounty').value;
    const deadline = $('#pub-deadline').value;
    const description = $('#pub-description').value.trim();
    const requirementsRaw = $('#pub-requirements').value.trim();
    const skills = getSelectedSkills();

    // 验证标题
    if (!title) {
        showFieldError('pub-title', '请输入任务标题');
        valid = false;
    }

    // 验证分类
    if (!category) {
        showFieldError('pub-category', '请选择任务分类');
        valid = false;
    }

    // 验证城市
    if (!city) {
        showFieldError('pub-city', '请选择城市');
        valid = false;
    }

    // 验证赏金
    const bounty = Number(bountyVal);
    if (!bountyVal || isNaN(bounty) || bounty <= 0) {
        showFieldError('pub-bounty', '赏金必须大于 0');
        valid = false;
    }

    // 验证截止时间
    if (!deadline) {
        showFieldError('pub-deadline', '请选择截止时间');
        valid = false;
    }

    // 验证描述
    if (!description) {
        showFieldError('pub-description', '请输入任务描述');
        valid = false;
    } else if (description.length < 20) {
        showFieldError('pub-description', '描述至少需要 20 字，当前 ' + description.length + ' 字');
        valid = false;
    }

    if (!valid) return;

    // 构建新任务
    const requirements = requirementsRaw
        ? requirementsRaw.split('\n').map((l) => l.trim()).filter(Boolean)
        : [];

    const newTask = {
        id: tasks.length > 0 ? Math.max.apply(null, tasks.map(function (t) { return t.id; })) + 1 : 1,
        title: title,
        category: category,
        city: city,
        bounty: bounty,
        deadline: deadline,
        status: '招募中',
        skills: skills.length > 0 ? skills : ['通用技能'],
        description: description,
        requirements: requirements.length > 0 ? requirements : ['按任务描述交付成果'],
        createdAt: todayStr()
    };

    tasks.push(newTask);
    persistAndRefresh();
    closeModal('publish-modal');
    showToast('任务发布成功！已添加到任务池。');
}

// -------------------- 全局持久化与刷新 --------------------
function persistAndRefresh() {
    saveToStorage(LS_TASKS_KEY, tasks);
    saveToStorage(LS_RECORDS_KEY, records);
    renderAll();
}

function renderAll() {
    renderStats();
    renderFilters();
    renderTasks();
    renderRecords();
    renderCompleted();
}

// -------------------- Toast --------------------
let toastTimer;

function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.hidden = true;
    }, 2800);
}

// -------------------- 事件绑定 --------------------
function bindEvents() {
    // 搜索
    $('#task-search').addEventListener('input', function (e) {
        searchKeyword = e.target.value.trim();
        renderTasks();
    });

    // 关闭 Modal（通过背景和关闭按钮）
    document.addEventListener('click', function (e) {
        var closeTarget = e.target.closest('[data-close]');
        if (closeTarget) {
            closeModal(closeTarget.dataset.close);
        }
    });

    // 发布任务按钮
    $('#btn-publish').addEventListener('click', openPublishModal);

    // 发布表单提交
    $('#publish-form').addEventListener('submit', handlePublishSubmit);

    // 描述字数统计
    $('#pub-description').addEventListener('input', function () {
        var len = this.value.length;
        $('#hint-description').textContent = len + '/20 字';
        if (len >= 20) clearFieldError('pub-description');
    });

    // 赏金实时验证
    $('#pub-bounty').addEventListener('input', function () {
        if (Number(this.value) > 0) clearFieldError('pub-bounty');
    });

    // 标题实时验证
    $('#pub-title').addEventListener('input', function () {
        if (this.value.trim()) clearFieldError('pub-title');
    });

    // 技能标签选择
    $('#pub-skills').addEventListener('click', function (e) {
        var tagBtn = e.target.closest('.tag-option');
        if (tagBtn) {
            e.preventDefault();
            tagBtn.classList.toggle('active');
        }
    });

    // 申请确认按钮
    $('#apply-confirm-btn').addEventListener('click', confirmApply);
}

// -------------------- 平滑滚动 --------------------
function initScroll() {
    $$('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = $(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// -------------------- 初始化 --------------------
document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    bindEvents();
    initScroll();
});