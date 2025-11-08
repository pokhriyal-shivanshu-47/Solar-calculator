const monthlyBillEl = document.getElementById('monthlyBill');
const sunHoursEl = document.getElementById('sunHours');
const costPerWattEl = document.getElementById('costPerWatt');
const panelWattEl = document.getElementById('panelWatt');
const unitRateEl = document.getElementById('unitRate');

const calcBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

const systemSizeEl = document.getElementById('systemSize');
const panelsEl = document.getElementById('panels');
const totalCostEl = document.getElementById('totalCost');
const roundedKWEl = document.getElementById('roundedKW');
const saveAmtEl = document.getElementById('saveAmt');

function formatRupee(num) {
  return Number(num).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function calculate() {
  const bill = parseFloat(monthlyBillEl.value);
  const sunHours = parseFloat(sunHoursEl.value);
  const costPerWatt = parseFloat(costPerWattEl.value);
  const panelWatt = parseFloat(panelWattEl.value);
  const unitRate = parseFloat(unitRateEl.value);

  if (!bill || !sunHours || !panelWatt || !unitRate || bill <= 0 || sunHours <= 0) {
    alert('Please enter valid electricity bill and sun hours!');
    return;
  }

  const monthlyUnits = bill / unitRate;
  const dailyUsage = monthlyUnits / 30;
  const systemKW = dailyUsage / sunHours;
  const systemKWdisplay = Math.round(systemKW * 100) / 100;

  const totalWatts = systemKW * 1000;
  const panelsNeeded = Math.ceil(totalWatts / panelWatt);
  const totalCost = Math.round(totalWatts * costPerWatt);

  const monthlySavingEstimate = Math.round(bill);

  systemSizeEl.textContent = `${systemKWdisplay} kW`;
  panelsEl.textContent = panelsNeeded;
  totalCostEl.textContent = `₹ ${formatRupee(totalCost)}`;
  roundedKWEl.textContent = systemKWdisplay;
  saveAmtEl.textContent = formatRupee(monthlySavingEstimate);

  document.querySelector('.results').classList.add('highlight');
  setTimeout(() => document.querySelector('.results').classList.remove('highlight'), 800);
}

calcBtn.addEventListener('click', calculate);

resetBtn.addEventListener('click', () => {
  monthlyBillEl.value = '';
  sunHoursEl.value = '';
  costPerWattEl.value = '55';
  panelWattEl.value = '350';
  unitRateEl.value = '8';
  systemSizeEl.textContent = '— kW';
  panelsEl.textContent = '—';
  totalCostEl.textContent = '— ₹';
  roundedKWEl.textContent = '—';
  saveAmtEl.textContent = '—';
});
