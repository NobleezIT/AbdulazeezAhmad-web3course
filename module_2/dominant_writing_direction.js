function dominantDirection(text) {
    // Your code here.
    function characterScript(code) {
      for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
          return script;
        }
      }
      return null;
    }
  
    function countBy(items, groupName) {
      let counts = [];
      for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
          counts.push({ name, count: 1 });
        } else {
          counts[known].count++;
        }
      }
      return counts;
    }
  
    let directions = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    });
  
    directions = directions.filter(({ name }) => name !== "none");
  
    if (directions.length === 0) return "ltr"; // Default direction if no valid scripts found
  
    return directions.reduce((a, b) => (a.count > b.count ? a : b)).name;
  }
  
  console.log(dominantDirection("Hello!"));
  // → ltr
  console.log(dominantDirection("Hey, مساء الخير"));
  // → rtl
  