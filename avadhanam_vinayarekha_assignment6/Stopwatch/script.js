

$(function () {
 
  const $timer = $("#timer");
  const $date = $("#eventDate");
  const $name = $("#eventName");
  const $dateErr = $("#dateError");
  const $nameErr = $("#nameError");

  const $btnStart = $("#btnStart");
  const $btnPause = $("#btnPause");
  const $btnStopSave = $("#btnStopSave");
  const $btnReset = $("#btnReset");

  const $historyList = $("#historyList");
  const $filterDate = $("#filterDate");
  const $stats = $("#stats");


  let elapsed = 0;      
  let ticker = null;    
  let running = false;

 
  $date.val(new Date().toISOString().slice(0,10));

 
  const pad = (n) => String(n).padStart(2, "0");
  function fmt(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  function paint() { $timer.text(fmt(elapsed)); }

  function validate() {
    let ok = true;

    if (!$date.val()) { $dateErr.text("Please select a date"); ok = false; }
    else $dateErr.text("");

    const v = ($name.val() || "").trim();
    if (!v) { $nameErr.text("Event name is required"); ok = false; }
    else if (v.length < 3) { $nameErr.text("At least 3 characters"); ok = false; }
    else if (v.length > 100) { $nameErr.text("Too long (max 100)"); ok = false; }
    else if (!/^[A-Za-z0-9\s\-'\\]+$/.test(v)) { $nameErr.text("Invalid characters"); ok = false; }
    else $nameErr.text("");

    return ok;
  }

  function setUI(runningOn) {
    $date.prop("disabled", runningOn);
    $name.prop("disabled", runningOn);
    $btnStart.prop("disabled", runningOn);
    $btnPause.prop("disabled", !runningOn);
    $btnStopSave.prop("disabled", !runningOn);
    $btnReset.prop("disabled", runningOn && elapsed === 0);
  }

  
  function startTicker() {
    return new Promise((resolve) => {
      ticker = setInterval(() => { elapsed += 1; paint(); }, 1000);
      resolve(); 
    });
  }

  async function handleStart() {
    if (!validate() || running) return;
    running = true;
    setUI(true);
    await startTicker();
  }

  function handlePause() {
    if (!running) return;
    clearInterval(ticker); ticker = null;
    running = false;
    setUI(false);
    $btnPause.text("Resume");
  }

  async function handleResume() {
    if (running) return;
    running = true;
    setUI(true);
    $btnPause.text("Pause");
    await startTicker();
  }

  function handleStopSave() {
    if (ticker) { clearInterval(ticker); ticker = null; }
    running = false; setUI(false); $btnPause.text("Pause");

    const record = {
      date: $date.val(),
      name: ($name.val() || "").trim(),
      duration: elapsed
    };

    const key = "stopwatch_sessions_v1";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(record);
    localStorage.setItem(key, JSON.stringify(list));

    renderHistory($filterDate.val());
  }

  function handleReset() {
    if (ticker) { clearInterval(ticker); ticker = null; }
    running = false;
    elapsed = 0;
    paint();
    setUI(false);
    $btnPause.text("Pause");
  }

  
  function renderHistory(filterDate = "") {
    const key = "stopwatch_sessions_v1";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const rows = filterDate ? list.filter(x => x.date === filterDate) : list;

    $historyList.empty();
    if (rows.length === 0) {
      $historyList.append('<li class="meta">No sessions recorded yet</li>');
      $stats.text("No sessions recorded yet");
      return;
    }

    
    let total = 0;
    rows.slice().reverse().forEach(({ date, name, duration }) => {
      total += duration;
      const li = $("<li/>").append(
        $("<div/>").text(name),
        $("<div class='meta'/>").text(`${date} • ${fmt(duration)}`)
      );
      $historyList.append(li);
    });

    $stats.text(`Total sessions: ${rows.length} • Total time: ${fmt(total)}`);
  }

 
  $btnStart.on("click", handleStart);
  $btnPause.on("click", () => (running ? handlePause() : handleResume()));
  $btnStopSave.on("click", handleStopSave);
  $btnReset.on("click", handleReset);

  $date.on("focus", () => $dateErr.text(""));
  $name.on("focus", () => $nameErr.text(""));

  $filterDate.on("change", function () { renderHistory($(this).val()); });

 
  paint();
  setUI(false);
  renderHistory();
});
