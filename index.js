const a = {
    name : "aayush",
    caste: "basnet",
    school:"self learner"
}

const {name, ...all} = a;
console.log(all);