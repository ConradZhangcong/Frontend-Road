/**
 * Concurrent Mode
 */

// /** @jsx Didact.createElement *
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );

const Didact = {
  createElement,
  render,
};

// JSX -> React Element
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

// React Element -> HTML ELEMENT
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// React Element -> HTML ELEMENT(Text Element)
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  // 创建dom节点
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  // 为dom节点添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => (dom[name] = element.props[name]));

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

let nextUnitOfWork = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWord) {
  // TODO
}

const container = document.getElementById("root");
Didact.render(element, container);
