import Handlebars from "handlebars";
const a = {
    sum: (a, b) => a + b,
    setSelected: (a, b) => {
        const c = Number(a) === Number(b);
        if (c) {
            console.log(1);
            return "selected";
        } else {
            console.log(0);
            return;
        }
    },
};
export default a;
