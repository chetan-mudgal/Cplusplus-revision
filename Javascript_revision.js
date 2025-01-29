// 1.0 Functions

// function declaration vs function expression:
// JavaScript treats function as a first-class citizen. This means that functions are simply a value and are just another type of object.
function sayHi() {
  alert("Hello");
}

let sayHi = function () {
  alert("Hello");
};

/* 
- Functions are values. They can be assigned, copied or declared in any place of the code.

- If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.

- If the function is created as a part of an expression, it’s called a “Function Expression”.

- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.

- Function Expressions are created when the execution flow reaches them.

Note: functions are blocked scope when functional are declared. 
*/

// 2. Object
/**
 * - Functions that are stored in object properties are called “methods”.
 * - Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a “reference” (address in memory) for the value
 * - To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function structuredClone or use a custom cloning implementation, such as _.cloneDeep(obj).

- Unbounded this: In JavaScript this is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”.
- Arrow functions have no "this", If we reference this from such a function, it’s taken from the outer “normal” function.

- Constructor functions should only be called using new. Such a call implies a creation of empty this at the start and returning the populated one at the end.

- By specification, only two primitive types may serve as object property keys:
    string type, or
    symbol type.
- Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. 

  let id = Symbol();
  user[id] = "xyz"
 */

// Global symbol registry
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert(id === idAgain); // true

// WeakMap and WeakSet
/* 

WeakMap is Map-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

WeakSet is Set-like collection that stores only objects and removes them once they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.
That comes at the cost of not having support for clear, size, keys, values…

WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.

*/

// Object.keys, object.values, object.entries
/* 

Object.keys(obj) – returns an array of keys.
Object.values(obj) – returns an array of values.
Object.entries(obj) – returns an array of [key, value] pairs.
 
*/

/* 
Var vs let

There are two main differences of var compared to let/const:

var variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
var declarations are processed at function start (script start for globals).


*/

// Global object
/* 
The global object holds variables that should be available everywhere.

That includes JavaScript built-ins, such as Array and environment-specific values, such as window.innerHeight – the window height in the browser.

The global object has a universal name globalThis.

…But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).
*/

// Advanced functions : Named Function Expression
/*
Functions are objects.

Here we covered their properties:

name – the function name. Usually taken from the function definition, but if there’s none, JavaScript tries to guess it from the context (e.g. an assignment).
length – the number of arguments in the function definition. Rest parameters are not counted.
If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.


- When a function is created using new Function, its [[Environment]] is set to reference not the current Lexical Environment, but the global one.

*/

// closure and lexical environment
/* 
Lexical Environment: The context in which a function is declared, determining which variables it has access to.
Closures: Functions that "remember" their lexical environment even after the outer function has finished execution, allowing them to access variables defined in that environment.
Closures are a cornerstone of JavaScript’s behavior and are often used to manage state, create private data, and build more flexible functions.
*/

// SetInterval and setTimeout

/**

- setTimeout allows us to run a function once after the interval of time.
- setInterval allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.


Zero delay setTimeout:
There’s a special use case: setTimeout(func, 0), or just setTimeout(func).

This schedules the execution of func as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.
 */

// call forwarding and method borrowing:
/* 

Call Forwarding: Forward a method call from one method to another, often to reuse code or delegate behavior.
Method Borrowing: Borrow a method from one object and use it with another object by controlling the context (this) using .call(), .apply(), or .bind(

*/

// Throttling imlementation way 1

function throttle(func, delay) {
  let isThrottled = false,
    savedThis,
    savedArgs;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments);

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, delay);
  }

  return wrapper;
}

function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored

// Throttling implementation 2
function throttle(func, delay) {
  // last, current,
  let last;
  let current;
  let timeoutId;
  return function () {
    current = Date.now();
    if (!last || current - last > delay) {
      last = Date.now();
      func.apply(this, arguments);
      return;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => func.apply(this, arguments),
      delay - current + last
    );
  };
}

function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored

// -----------------------------Debounce implementaiton -------------------------
function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

// -----------------------Function binding ----------------------------

/*

Method func.bind(context, ...args) returns a “bound variant” of function func that fixes the context this and first arguments if given.

Usually we apply bind to fix this for an object method, so that we can pass it somewhere. For example, to setTimeout.

When we fix some arguments of an existing function, the resulting (less universal) function is called partially applied or partial.

*/

// -------------------------Arrow functions-----------------------------

/*

Arrow functions:

Do not have this
Do not have arguments
Can’t be called with new
They also don’t have super.

*/

// ----------------------Property flags and descriptors---------------------------
/**
- In JavaScript, all objects have a hidden [[Prototype]] property that’s either another object or null.
- We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by [[Prototype]] is called a “prototype”.
- If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
- If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
- The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.
 */

//-----------------------------Native prototypes ----------------------------------

/*

All built-in objects follow the same pattern:
The methods are stored in the prototype (Array.prototype, Object.prototype, Date.prototype, etc.)
The object itself stores only the data (array items, object properties, the date)
Primitives also store methods in prototypes of wrapper objects: Number.prototype, String.prototype and Boolean.prototype. Only undefined and null do not have wrapper objects
Built-in prototypes can be modified or populated with new methods. But it’s not recommended to change them. The only allowable case is probably when we add-in a new standard, but it’s not yet supported by the JavaScript engine

prototype vs __proto__
prototype is a property of functions and is used to define properties/methods for instances.
__proto__ is a property of objects and points to their prototype.
*/

//--------------------Promises --------------------------------------------

/*

There are 6 static methods of Promise class:

Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.
Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
status: "fulfilled" or "rejected"
value (if fulfilled) or reason (if rejected).
Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.
Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.
Promise.resolve(value) – makes a resolved promise with the given value.
Promise.reject(error) – makes a rejected promise with the given error.
Of all these, Promise.all is probably the most common in practice.


*/

// ---------------------------Currying-------------------------------------
/**
 Currying is a transform that makes f(a,b,c) callable as f(a)(b)(c). JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying is a process of transforming a function with multiple arguments into a sequence of functions, each taking a single argument.
It allows for more reusable, configurable, and composable functions.
Use Cases: Function configuration, event handling, URL building, functional programming.
Currying is a powerful pattern that encourages writing cleaner and more modular code, and is a common practice in functional programming.

 */

const curry =
  (fn) =>
  (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs) => curry(fn)(...args, ...moreArgs);
    }
  };

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // Output: 6
console.log(curriedAdd(1, 2)(3)); // Output: 6
console.log(curriedAdd(1)(2, 3)); // Output: 6

// -------------------------Microtask queue and event loop------------------------
/*
Event Loop: The mechanism that handles execution of code, manages asynchronous tasks, and keeps the application responsive.
Microtask Queue: A high-priority queue that stores microtasks (e.g., promise callbacks) to be executed immediately after the current operation finishes and before moving to the task queue.
Task Queue: A lower-priority queue that stores tasks (e.g., callbacks from setTimeout, event handlers) which are executed after all microtasks have been processed.


*/

//------------------- DOM cheat sheet-------------------------------------------

/*

The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the structure of a document as a tree of nodes, which allows you to access and manipulate the elements of a web page using JavaScript.

**Selecting Elements:**

* **`document.getElementById(id)`:**  Selects an element by its unique ID.
* **`document.querySelector(selector)`:**  Selects the first element that matches the specified CSS selector.
* **`document.querySelectorAll(selector)`:**  Selects all elements that match the specified CSS selector.
* **`document.getElementsByTagName(tagName)`:**  Selects all elements with the specified tag name.
* **`document.getElementsByClassName(className)`:**  Selects all elements with the specified class name.

**Accessing and Modifying Element Content:**

* **`element.innerHTML`:**  Gets or sets the HTML content of an element.
* **`element.textContent`:**  Gets or sets the text content of an element.
* **`element.getAttribute(attributeName)`:**  Gets the value of the specified attribute.
* **`element.setAttribute(attributeName, value)`:**  Sets the value of the specified attribute.
* **`element.removeAttribute(attributeName)`:**  Removes the specified attribute.

**Manipulating the DOM Tree:**

* **`element.appendChild(child)`:**  Adds a child node to the end of an element's child list.
* **`element.insertBefore(newChild, referenceChild)`:**  Inserts a new child node before a reference child node.
* **`element.removeChild(child)`:**  Removes a child node from an element.
* **`element.replaceChild(newChild, oldChild)`:**  Replaces an existing child node with a new child node.
* **`document.createElement(tagName)`:**  Creates a new element with the specified tag name.

**Event Handling:**

* **`element.addEventListener(eventType, listener)`:**  Adds an event listener to an element.
* **`element.removeEventListener(eventType, listener)`:**  Removes an event listener from an element.

**Common Properties and Methods:**

* **`element.parentNode`:**  Gets the parent node of an element.
* **`element.childNodes`:**  Gets a collection of an element's child nodes.
* **`element.firstChild`:**  Gets the first child node of an element.
* **`element.lastChild`:**  Gets the last child node of an element.
* **`element.nextSibling`:**  Gets the next sibling node of an element.
* **`element.previousSibling`:**  Gets the previous sibling node of an element.
* **`element.classList`:**  Provides methods for manipulating the CSS classes of an element.
* **`element.style`:**  Provides access to an element's CSS styles.

** imp: ele.closest()
The element.closest() method in JavaScript is used to find the nearest ancestor (including the element itself) that matches a specified CSS selector. This method traverses up the DOM tree, starting from the element it’s called on, and checks each ancestor until it finds one that matches the selector. If no matching ancestor is found, it returns null.
The closest() method is useful when you want to perform actions on an element’s parent or ancestor based on a particular class or attribute without having to manually traverse the DOM using multiple parentNode or parentElement calls.

*/

//------------------------------------CSS from DOM-------------------------------
/*

To manage classes, there are two DOM properties:

className – the string value, good to manage the whole set of classes.
classList – the object with methods add/remove/toggle/contains, good for individual classes.
To change the styles:

The style property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the "style" attribute. To see how to apply important and other rare stuff – there’s a list of methods at MDN.

The style.cssText property corresponds to the whole "style" attribute, the full string of styles.

To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

The getComputedStyle(elem, [pseudo]) returns the style-like object with them. Read-only.

*/

//--------------------------------Events and event handlers ------------------------

/*
There are 3 ways to assign event handlers:

HTML attribute: onclick="...".
DOM property: elem.onclick = function.
Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.
HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can’t write lots of code in there.

DOM properties are ok to use, but we can’t assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance transitionend and DOMContentLoaded (to be covered). Also addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.

No matter how you assign the handler – it gets an event object as the first argument. That object contains the details about what’s happened.

*/

// ------------------------ Bubbling and capturing events ------------------------------------------

/*

When an event happens – the most nested element where it happens gets labeled as the “target element” (event.target).

Then the event moves down from the document root to event.target, calling handlers assigned with addEventListener(..., true) on the way (true is a shorthand for {capture: true}).
Then handlers are called on the target element itself.
Then the event bubbles up from event.target to the root, calling handlers assigned using on<event>, HTML attributes and addEventListener without the 3rd argument or with the 3rd argument false/{capture:false}.
Each handler can access event object properties:

event.target – the deepest element that originated the event.
event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it)
event.eventPhase – the current phase (capturing=1, target=2, bubbling=3).
Any event handler can stop the event by calling event.stopPropagation(), but that’s not recommended, because we can’t really be sure we won’t need it above, maybe for completely different things.

The capturing phase is used very rarely, usually we handle events on bubbling. And there’s a logical explanation for that.

In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.

The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular <td> may be suited for that exactly <td>, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

Bubbling and capturing lay the foundation for “event delegation” – an extremely powerful event handling pattern that we study in the next chapter.

*/

// --------------------------Event delegation ------------------------------------
/*
Event delegation is really cool! It’s one of the most helpful patterns for DOM events.

It’s often used to add the same handling for many similar elements, but not only for that.

The algorithm:

Put a single handler on the container.
In the handler – check the source element event.target.
If the event happened inside an element that interests us, then handle the event.

** The dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements. It exposes a map of strings (DOMStringMap) with an entry for each data-* attribute.


<div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth>
  Carina Anand
</div>

el.dataset.dateOfBirth = "1960-10-03";
*/

// ---------------------Browser default actions ----------------------------

/*
There are many default browser actions:

mousedown – starts the selection (move the mouse to select).
click on <input type="checkbox"> – checks/unchecks the input.
submit – clicking an <input type="submit"> or hitting Enter inside a form field causes this event to happen, and the browser submits the form after it.
keydown – pressing a key may lead to adding a character into a field, or other actions.
contextmenu – the event happens on a right-click, the action is to show the browser context menu.
…there are more…
All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

To prevent a default action – use either event.preventDefault() or return false. The second method works only for handlers assigned with on<event>.

The passive: true option of addEventListener tells the browser that the action is not going to be prevented. That’s useful for some mobile events, like touchstart and touchmove, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of event.defaultPrevented becomes true, otherwise it’s false.
*/

// ------------------------------Custom events----------------------------

/*

To generate an event from code, we first need to create an event object.

The generic Event(name, options) constructor accepts an arbitrary event name and the options object with two properties:

bubbles: true if the event should bubble.
cancelable: true if the event.preventDefault() should work.
Other constructors of native events like MouseEvent, KeyboardEvent and so on accept properties specific to that event type. For instance, clientX for mouse events.

For custom events we should use CustomEvent constructor. It has an additional option named detail, we should assign the event-specific data to it. Then all handlers can access it as event.detail.

Despite the technical possibility of generating browser events like click or keydown, we should use them with great care.

We shouldn’t generate browser events as it’s a hacky way to run handlers. That’s bad architecture most of the time.

Native events might be generated:

As a dirty hack to make 3rd-party libraries work the needed way, if they don’t provide other means of interaction.
For automated testing, to “click the button” in the script and see if the interface reacts correctly.
Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.


*/

// ------------------------------ Mouse events ---------------------------------
/*
Mouse events have the following properties:

Button: button.

Modifier keys (true if pressed): altKey, ctrlKey, shiftKey and metaKey (Mac).

If you want to handle Ctrl, then don’t forget Mac users, they usually use Cmd, so it’s better to check if (e.metaKey || e.ctrlKey).
Window-relative coordinates: clientX/clientY.

Document-relative coordinates: pageX/pageY.

The default browser action of mousedown is text selection, if it’s not good for the interface, then it should be prevented.

In the next chapter we’ll see more details about events that follow pointer movement and how to track element changes under it.



We covered events mouseover, mouseout, mousemove, mouseenter and mouseleave.

These things are good to note:

A fast mouse move may skip intermediate elements.
Events mouseover/out and mouseenter/leave have an additional property: relatedTarget. That’s the element that we are coming from/to, complementary to target.
Events mouseover/out trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time – the deepest one.

Events mouseenter/leave are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.

*/

// -----------------------Ponter events (better option to mouse events)-------------------------------

/*
Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace mouse with pointer in event names and expect our code to continue working for mouse, with better support for other device types.

For drag’n’drops and complex touch interactions that the browser may decide to hijack and handle on its own – remember to cancel the default action on events and set touch-action: none in CSS for elements that we engage.

Additional abilities of pointer events are:

Multi-touch support using pointerId and isPrimary.
Device-specific properties, such as pressure, width/height, and others.
Pointer capturing: we can retarget all pointer events to a specific element until pointerup/pointercancel. (setPointerCapture method)
As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.

*/
