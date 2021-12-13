/**
 * Fiber
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

function createDom(filber) {
  // 创建dom节点
  const dom =
    filber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(filber.type);
  // 为dom节点添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(filber.props)
    .filter(isProperty)
    .forEach((name) => (dom[name] = filber.props[name]));

  return dom;
}

function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
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

/**
 * 1. add the element to the DOM
 * 2. create the fibers for the element’s children
 * 3. select the next unit of work
 * @param {*} nextUnitOfWord
 */
function performUnitOfWork(fiber) {
  // 1
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // 2.
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];

    const newFilber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFilber;
    } else {
      prevSibling.sibling = newFilber;
    }
    prevSibling = newFilber;
    index++;
  }
  // 3.
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const container = document.getElementById("root");
Didact.render(element, container);
