class Powerup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.lifetime = 600; // 10 seconds at 60 FPS
        this.collected = false;
    }

    update() {
        this.lifetime -= 1;
        return this.lifetime > 0;
    }

    apply(player) {
        // Override in subclasses
    }

    getColor() {
        return 'rgb(255, 255, 255)';
    }

    draw(ctx) {
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ShieldPowerup extends Powerup {
    getColor() {
        return 'rgb(100, 200, 255)';
    }

    apply(player) {
        player.invincible = true;
        player.invincibleEndTime = Date.now() + 8000;
    }
}

class RapidFirePowerup extends Powerup {
    getColor() {
        return 'rgb(255, 200, 100)';
    }

    apply(player) {
        player.rapidFire = true;
        player.rapidFireEndTime = Date.now() + 10000;
    }
}

class ScorePowerup extends Powerup {
    getColor() {
        return 'rgb(255, 255, 100)';
    }

    apply(player) {
        // Award points when collected
    }
}
