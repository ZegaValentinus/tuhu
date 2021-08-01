export function addChatListeners(html) {
    console.log(this);
}

export const highlightTaskCheckResults = function (message, html, data) {
    if (!message.isRoll || !message.isContentVisible) {
        return;
    }

    const taskCheck = html.find(".task-check");
    if (!taskCheck) {
        return;
    }

    const roll = message.roll;

    const plusDice = roll.dice[0].rolls[0];
    const minusDice = roll.dice[1].rolls[0];
    let boxcars = plusDice.exploded && minusDice.exploded;

    if (boxcars) {
        taskCheck.find(".dice-formula").addClass("boxcars");
    }

    if (roll.total < 0) {
        taskCheck.find(".dice-total").addClass("critical-failure");
    }
    else {
        const outcome = taskCheck.find(".outcome");
        if (outcome) {
            const outcomeValue = outcome.attr("data-outcome");
            if (outcomeValue < 0 && boxcars) {
                outcome.addClass("critical-failure");
            }
        }
    }
}