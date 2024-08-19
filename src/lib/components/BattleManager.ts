import { CharacterManager } from './CharacterManager';
import { performAttack, resetAttackAnimation } from './attackAnimations';

export class BattleManager {
  battleMode = false;
  battleLog: string[] = [];
  private characterManager: CharacterManager;
  private logUpdateCallback: (log: string[]) => void = () => {};

  constructor(characterManager: CharacterManager) {
    this.characterManager = characterManager;
  }

  startBattle() {
    this.battleMode = true;
    this.battleLog.push("Battle started!");
    this.aiBattle();
  }

  private aiBattle() {
    if (!this.battleMode) return;

    const characters = this.characterManager.getActiveCharacters();

    if (characters.length <= 1) {
      this.endBattle(characters[0]);
      return;
    }

    const attacker = characters[Math.floor(Math.random() * characters.length)];
    let defender;
    do {
      defender = characters[Math.floor(Math.random() * characters.length)];
    } while (defender === attacker);

    this.attack(attacker, defender);

    if (this.battleMode) {
      setTimeout(() => this.aiBattle(), 2000); // Increased delay between attacks for better visibility
    }
  }

  private attack(attacker: 'mario' | 'sonic' | 'pacman', defender: 'mario' | 'sonic' | 'pacman') {
    const attackOptions = 
      attacker === 'mario' ? ['fireball', 'jump', 'punch'] :
      attacker === 'sonic' ? ['spinDash', 'homing', 'kick'] :
      ['chomp', 'powerPellet', 'ghostEat'];
    
    const attackType = attackOptions[Math.floor(Math.random() * attackOptions.length)];
    const damage = performAttack(
      this.characterManager.getCharacter(attacker), 
      attackType
    );

    this.characterManager.reduceHealth(defender, damage);

    this.battleLog.push(`${attacker} uses ${attackType} on ${defender} for ${damage} damage!`);
    this.logUpdateCallback(this.battleLog);

    setTimeout(() => resetAttackAnimation(this.characterManager.getCharacter(attacker)), 1000);
  }

  endBattle(winner: 'mario' | 'sonic' | 'pacman') {
    this.battleMode = false;
    this.battleLog.push(`${winner} wins the battle!`);
    this.logUpdateCallback(this.battleLog);
    setTimeout(() => this.characterManager.reset(), 3000);
  }

  onBattleLogUpdate(callback: (log: string[]) => void) {
    this.logUpdateCallback = callback;
  }
}
