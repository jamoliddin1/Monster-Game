// POINT ATTACKS 
const powerOfUserAttack = 12;
const userStrongAttack = 18;
const powerOfMonsterAttack = 16;

// TYPE OF ATTACKS
const typeSimpleAttack = 'ATTACK';
const typeStrongAttack = 'STRONG_ATTACK';

// LOG EVENT ATTACKS
const logEventUserAttack = 'LOG_USER_ATTACK';
const logEventUserStrongAttack = 'LOG_USER_STRONG_ATTACK';
const logEventMonsterAttack = 'LOG_Monster_ATTACK';
const logEventUserHeal = 'LOG_USER_HEAL';
const logEventGameOver = 'Game_Over!';

// EXTRA LIFE (HEAL)
const userExtraLife = 19;

// USER ENTERED NUMBER AND THROW ERROR!!!

function userHeroLife() {
  const userEnteredLife = prompt('Enter life of your hero', '100');
  const changeToInteger = parseInt(userEnteredLife);

  if (isNaN(changeToInteger) || changeToInteger <= 0) {
    throw { message: 'You enter to input field not number or smaller than 0' }
  }
  return changeToInteger;
}

let lifeOfGameHeros;

try {
  lifeOfGameHeros = userHeroLife();
} catch (errorGame) {
  console.log(errorGame);
  lifeOfGameHeros = 100;
  alert('You entered something wrong so your default life is 100');
}



// ARRAY
let battleLogGame = [];
let logLastEvent;

// LIFE (HEALTH) GAME HEROS
let monsterLife = lifeOfGameHeros;
let playerLife = lifeOfGameHeros;

// Bonus life
let hasUserBonusLife = true;

// LIFE IN UI (BROWSER)
adjustHealthBars(lifeOfGameHeros);

// LOG
function logFunc(evnt, vlue, monsterHealth, userHealth) {
  let logVar = {
    event: evnt,
    value: vlue,
    finalMonsterLife: monsterHealth,
    finalUserLife: userHealth
  };

  // EQUALITY WITH SWITCH (IF YOUR APP WORKS INCORRECT CHECKS THIS CODE)
  switch (evnt) {
    case logEventUserAttack:
      logVar.target = 'MONSTER';
      break;
    case logEventUserStrongAttack:
      logVar = {
        event: evnt,
        value: vlue,
        target: 'MONSTER',
        finalMonsterLife: monsterHealth,
        finalUserLife: userHealth
      };
      break;
    case logEventMonsterAttack:
      logVar = {
        event: evnt,
        value: vlue,
        target: 'USER',
        finalMonsterLife: monsterHealth,
        finalUserLife: userHealth
      };
      break;
    case logEventUserHeal:
      logVar = {
        event: evnt,
        value: vlue,
        target: 'USER',
        finalMonsterLife: monsterHealth,
        finalUserLife: userHealth
      };
      break;
    case logEventGameOver:
      logVar = {
        event: evnt,
        value: vlue,
        finalMonsterLife: monsterHealth,
        finalUserLife: userHealth
      };
      break;
    default:
      logVar = {};
  }

  // Equality with if else
  // if (evnt === logEventUserAttack) {
  //   logVar.target = 'MONSTER';
  // } else if (evnt === logEventUserStrongAttack) {
  //   logVar = {
  //     event: evnt,
  //     value: vlue,
  //     target: 'MONSTER',
  //     finalMonsterLife: monsterHealth,
  //     finalUserLife: userHealth
  //   };
  // } else if (evnt === logEventMonsterAttack) {
  //   logVar = {
  //     event: evnt,
  //     value: vlue,
  //     target: 'USER',
  //     finalMonsterLife: monsterHealth,
  //     finalUserLife: userHealth
  //   };
  // } else if (evnt === logEventUserHeal) {
  //   logVar = {
  //     event: evnt,
  //     value: vlue,
  //     target: 'USER',
  //     finalMonsterLife: monsterHealth,
  //     finalUserLife: userHealth
  //   };
  // } else if (evnt === logEventGameOver) {
  //   logVar = {
  //     event: evnt,
  //     value: vlue,
  //     finalMonsterLife: monsterHealth,
  //     finalUserLife: userHealth
  //   };
  // }
  battleLogGame.push(logVar);
}

// REPLAY GAME
function replay() {
  monsterLife = lifeOfGameHeros;
  playerLife = lifeOfGameHeros;
  resetGame(lifeOfGameHeros);
}

// SHARE FUNCTION WHO WON (CONNECTED WITH HEAL)
function resultOfWhoWon() {
  const beginningLife = playerLife;
  const MonsterDecreaseLifeOfPlayer = dealPlayerDamage(powerOfMonsterAttack);
  playerLife -= MonsterDecreaseLifeOfPlayer;

  logFunc(logEventMonsterAttack, MonsterDecreaseLifeOfPlayer, monsterLife, playerLife)

  // BONUSLIFE CONDITION
  if (playerLife <= 0 && hasUserBonusLife) {
    hasUserBonusLife = false;
    removeBonusLife();
    playerLife = beginningLife;
    setPlayerHealth(beginningLife);
    alert('You have one bonus life to win!');
  }

  // WHO WON
  if (monsterLife <= 0 && playerLife > 0) {
    alert('Congratulations! You won :)');
    logFunc(logEventGameOver, 'Player Won! :)', monsterLife, playerLife);

  } else if (playerLife <= 0 && monsterLife > 0) {
    alert('You lost :(');
    logFunc(logEventGameOver, 'MONSTERR.. Won!', monsterLife, playerLife);

  } else if (playerLife <= 0 && monsterLife <= 0) {
    alert('You have draw');
    logFunc(logEventGameOver, 'DRAW', monsterLife, playerLife);

  }

  // REPLAY CONDITION
  if (monsterLife <= 0 || playerLife <= 0) {
    replay();
  }
}

// TYPE OF ATTACKS
function attackToMonster(typeOfAttack) {
  // TERNARY OPERATORS
  const powerUser = typeOfAttack === typeSimpleAttack ? powerOfUserAttack : userStrongAttack;
  const logEvnt = typeOfAttack === typeSimpleAttack ? logEventUserAttack : logEventUserStrongAttack;

  // CHECK WITH IF ELSE IF
  // if (typeOfAttack === typeSimpleAttack) {
  //   powerUser = powerOfUserAttack;
  //   logEvnt = logEventUserAttack;
  // } else if (typeOfAttack === typeStrongAttack) {
  //   powerUser = userStrongAttack;
  //   logEvnt = logEventUserStrongAttack;
  // }

  const userDecreaseLifeOfMonster = dealMonsterDamage(powerUser);
  monsterLife -= userDecreaseLifeOfMonster;

  logFunc(logEvnt, userDecreaseLifeOfMonster, monsterLife, playerLife);

  resultOfWhoWon();
}

// SIMPLE ATTACK
function attackFunc() {
  attackToMonster(typeSimpleAttack);
}

// STRONG ATTACK
function strongAttackFunc() {
  attackToMonster(typeStrongAttack);
}

// HEAL USER (ADD LIFE)
function healPlayerFunc() {
  let healValue;
  if (playerLife >= lifeOfGameHeros - userExtraLife) {
    alert('You have enough health');
    healValue = lifeOfGameHeros - playerLife;
  } else {
    healValue = userExtraLife;
  }
  increasePlayerHealth(healValue);
  playerLife += healValue;
  logFunc(logEventUserHeal, healValue, monsterLife, playerLife);
  resultOfWhoWon();
}

function logFuncBtn() {
  // THE OLD FOR LOOP (SIMPLE INCREMENT)
  // for (let i = 0; i < 4; i++) {
  //   console.log('for loop 4 times');
  // }

  // WHILE LOOP & LABELED STATEMENT
  let f = 0;
  parentLoop: do {
    console.log('Parent', f);
    childLoopName: for (let r = 0; r < 6; r++) {
      if (r === 5) {
        break parentLoop;
      }
      console.log('Child', r);
    }
    f++;
  } while (f < 4);

  // THE OLD FOR LOOP (WITH DECREMENTING)
  // for (let i = 7; i > 0;) {
  //   i--
  //   console.log(i);
  // }

  // for (let i = 0; i < battleLogGame.length; i++) {
  //   console.log(battleLogGame[i]);
  // }

  // FOR OF (ARRAY) && FOR IN (OBJECT)
  // 36.YOU DIDN'T UNDERSTAND CODE WATCH TURTORIAL AGAIN TO LEARN MORE 
  let i = 0;
  for (const forWithArray of battleLogGame) {
    if ((!logLastEvent && logLastEvent !== 0) || logLastEvent < i) {
      console.log(`#${i}`);
      for (const propertyObj in forWithArray) {
        console.log(`${propertyObj} => ${forWithArray[propertyObj]}`);
        // EXTRA CODE TO TEST
        // break;
      }
      logLastEvent = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener('click', attackFunc);
strongAttackBtn.addEventListener('click', strongAttackFunc);
healBtn.addEventListener('click', healPlayerFunc);
logBtn.addEventListener('click', logFuncBtn)