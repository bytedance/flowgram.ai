# Array

import { NodeFormArrayPreview } from '../../../../components/node-form/array/preview';

The following example demonstrates the basic usage of arrays, including:

* Basic implementation (rendering, adding and removing items).
* How to configure validation logic for each array item. In this case, the validation rule is that each item should not exceed 8 English characters.
* How to configure side effects for each array item. Here, the side effect outputs `${name} value init to ${value}` to the console during initialization, and `${name} value changed to ${value}` when the value changes.
* How to swap array items.

<NodeFormArrayPreview />
