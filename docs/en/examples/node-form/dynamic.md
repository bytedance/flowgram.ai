# Dynamic Field

import { NodeFormDynamicPreview } from '../../../../components';

This example demonstrates how to declare dependencies between form fields using the `deps` property.

Example explanation: The `City` field will only be displayed when `Country` has a value.

You can also use `form.getValueIn('country')` as an input parameter for the component under the city `Field` to control the component's behavior, such as filtering cities based on the selected country.

<NodeFormDynamicPreview />
