import Handlebars from "handlebars";
const a = {
    sum: (a, b) => a + b,
    setSelected: (a, b) => {
        const c = Number(a) === Number(b) + 1;
        if (c) {
            return "selected";
        } else {
            return;
        }
    },
    setClassifyId: (id) => {
        console.log(id);
        return id;
    },
    sortable: (filed, sort) => {
        const sortType = filed === sort.column ? sort.type : "default";
        const types = {
            default: "desc",
            desc: "asc",
            asc: "desc",
        };
        const icons = {
            default: "descending",
            asc: "ascending",
            desc: "descending",
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const image = () => {
            if (sortType === "default") {
                return '<img src="https://img.icons8.com/material-rounded/24/000000/sort.png"/>';
            } else {
                return `<img src="https://img.icons8.com/external-dashed-line-kawalan-studio/24/000000/external-sort-${icon}-shopping-e-commerce-dashed-line-kawalan-studio.png" />`;
            }
        };
        const href = Handlebars.escapeExpression(
            `?_sort&column=${filed}&type=${type}`
        );
        const output = `
        <a href="${href}">
            ${image()}
            
        </a>`;
        return new Handlebars.SafeString(output);
    },
};
export default a;
