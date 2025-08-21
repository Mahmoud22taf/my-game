const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 460, width: 40, height: 20, speed: 20 };
let objects = [];
let score = 0;
let missed = 0;

// حركة اللاعب
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += player.speed;
});

// إنشاء كرات تسقط
function spawnObject() {
  const x = Math.random() * (canvas.width - 20);
  objects.push({ x, y: 0, size: 20, speed: 3 });
}

// تحديث اللعبة
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم اللاعب
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // رسم الكرات
  ctx.fillStyle = "yellow";
  objects.forEach((obj, index) => {
    obj.y += obj.speed;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
    ctx.fill();

    // كشف التصادم
    if (
      obj.y + obj.size > player.y &&
      obj.x > player.x &&
      obj.x < player.x + player.width
    ) {
      score++;
      objects.splice(index, 1);
    }

    // الكرة فاتت
    if (obj.y > canvas.height) {
      missed++;
      objects.splice(index, 1);
    }
  });

  // تحديث النص
  document.getElementById("score").textContent = `Score: ${score} | Missed: ${missed}`;

  // فحص الخسارة
  if (missed >= 3) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 120, 250);
    return; // وقف اللعبة
  }

  requestAnimationFrame(update);
}

// تشغيل
setInterval(spawnObject, 1500);
update();
