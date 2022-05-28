# JsCustomEvent

Sometimes, the available JavaScript events don’t adequately or correctly describe the state of an application. For example, when a user login fails and you want the parent component or element to know about the failure, there is no login-failed event or anything similar available to be dispatched.

Fortunately, there’s a way to create JavaScript custom events for your application, which is what we’ll cover in this tutorial.

How to create a custom event in JavaScript
Custom events can be created in two ways:

Using the Event constructor
Using the CustomEvent constructor
Custom events can also be created using document.createEvent, but most of the methods exposed by the object returned from the function have been deprecated.

Using the event constructor
A custom event can be created using the event constructor, like this:

const myEvent = new Event('myevent', {
bubbles: true,
cancelable: true,
composed: false
})
In the above snippet, we created an event, myevent, by passing the event name to the Event constructor. Event names are case-insensitive, so myevent is the same as myEvent and MyEvent, etc.

The event constructor also accepts an object that specifies some important properties regarding the event.

bubbles
The bubbles property specifies whether the event should be propagated upward to the parent element. Setting this to true means that if the event gets dispatched in a child element, the parent element can listen on the event and perform an action based on that. This is the behavior of most native DOM events, but for custom events, it is set to false by default.

If you only want the event to be dispatched at a particular element, you can stop the propagation of the event via event.stopPropagation(). This should be in the callback that listens on the event. More on this later.

cancelable
As the name implies, cancelable specifies whether the event should be cancelable.

Native DOM events are cancelable by default, so you can call event.preventDefault() on them, which will prevent the default action of the event. If the custom event has cancelable set to false, calling event.preventDefault() will not perform any action.

composed
The composed property specifies whether an event should bubble across from the shadow DOM (created when using web components) to the real DOM. If bubbles is set to false, the value of this property won’t matter because you’re explicitly telling the event not to bubble upward. However, if you want to dispatch a custom event in a web component and listen on it on a parent element in the real DOM, then the composed property needs to be set to true.

A drawback of using this method is that you can’t send data across to the listener. However, in most applications, we would want to be able to send data across from where the event is being dispatched to the listener. To do this, we can use the CustomEvent controller

You can’t also send data using native DOM events. Data can only be gotten from the event’s target.

Using the CustomEvent constructor
A custom event can be created using the CustomEvent constructor:

const myEvent = new CustomEvent("myevent", {
detail: {},
bubbles: true,
cancelable: true,
composed: false,
});
As shown above, creating a custom event via the CustomEvent constructor is similar to creating one using the Event constructor. The only difference is in the object passed as the second parameter to the constructor.

When creating events with the Event constructor, we were limited by the fact that we can’t pass data through the event to the listener. Here, any data that needs to be passed to the listener can be passed in the detail property, which is created when initializing the event.

Dispatching custom events in JavaScript
After creating the events, you need to be able to dispatch them. Events can be dispatched to any object that extends EventTarget, and they include all HTML elements, the document, the window, etc.

You can dispatch custom events like so:

const myEvent = new CustomEvent("myevent", {
detail: {},
bubbles: true,
cancelable: true,
composed: false,
});
document.querySelector("#someElement").dispatchEvent(myEvent);
To listen for the custom event, add an event listener to the element you want to listen on, just as you would with native DOM events.

document.querySelector("#someElement").addEventListener("myevent", (event) => {
console.log("I'm listening on a custom event");
});
