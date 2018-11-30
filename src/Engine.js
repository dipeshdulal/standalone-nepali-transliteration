class Engine{
	constructor(rules = null){
		if(rules){
			this.rules = rules;
		}else{
			this.rules = require('./rules.json');
		}
		this.initialize_rules();
		this.result = [];
	}

	replace_numbers(word){
		return word.split('')
					.map(letter => this.rules.numbers[letter] || letter )
					.join('');
	}

	append_prepend(ind, add){
		const indiv = this.rules.individual[ind];
		const ind_len = indiv.length;

		if(add in this.rules.prepend){
			return this.rules.addition[add] + indiv;
		}

		if(indiv[ind_len-1] === "्"){
			return indiv.substring(0, ind_len-1) + this.rules.addition[add];
		}else{
			return indiv + this.rules.addition[add];
		}
	}

	initialize_rules(){
		this.combination = {};
		
		for(let ind of Object.keys(this.rules.individual)){
			this.combination[ind] = this.rules.individual[ind];
			this.combination[ind + "a"] = this.rules.individual[ind].substring(0, this.rules.individual[ind].length - 1);
		}

		for(let ind of Object.keys(this.rules.individual)){
			for(let add of Object.keys(this.rules.addition)){
				const key = ind+add;
				let val = this.append_prepend(ind, add);
				this.combination[key] = val;
			}
		}

	}
	
	replace_combination(word, remaining){
		let replace, remain;
		
		if(remaining.length === 0){
			this.result.push(word);
		}

		for(let c of Object.keys(this.combination)){
			if(remaining.indexOf(c) == 0){
				replace = word.replace(c, this.combination[c]); 
				remain = remaining.substring(c.length);
				// result.push({ 
				// 	replace, 
				// 	remain, 
				// 	next: this.replace_combination(replace, remain) });
				this.replace_combination(replace, remain);
			}
		}

	}

	transliterate(words){
		const x = words.split(/\s+/);
		for(const word of x){
			let w;
			this.result = [];
			w = this.replace_numbers(word);
			this.replace_combination(w, w);
			console.log(this.result);
		}
	}
}

module.exports = Engine;