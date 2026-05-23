---
title: "Availability settings"
source: "https://cal.com/docs/atoms/availability-settings"
tags: [cal-com, docs]
---
The availability settings atom enables a user to set their available time slots. This atom allows users to define specific time slots when they are available for meetings or events, helping them manage their schedules effectively and avoid double bookings.First, for the AvailabilitySettings toggle animation to work set the reading direction on the `<html>` element:

```
<html dir="ltr"> ... </html>
```

Below code snippet can be used to render the availability settings atom

```
import { AvailabilitySettings } from "@calcom/atoms";

export default function Availability() {
  return (
    <>
       <AvailabilitySettings
          onUpdateSuccess={() => {
            console.log("Updated schedule successfully");
          }}
          onDeleteSuccess={() => {
            console.log("Deleted schedule successfully");
          }}
          onFormStateChange={(formState) => {
            console.log("Form state updated");
            // Access form data: formState.name, formState.schedule, formState.timeZone, etc.
          }}
       />
    </>
  )
}
```

For a demonstration of the availability settings atom, please refer to the video below.

If a user wishes to add further adjustments to their availability for special occasions or events, they can use the date overrides feature. Date overrides enables users to pick any date that they’re currently available and set specific hours for availability on that day or mark themselves entirely unavailable. Once that day is passed, the date override is automatically deleted.Below code snippet can be used to render date overrides into the availability settings atom

```
import { AvailabilitySettings } from "@calcom/atoms";

export default function Availability() {
  return (
    <>
       <AvailabilitySettings
          enableOverrides={true}
          onUpdateSuccess={() => {
            console.log("Updated schedule successfully");
          }}
          onDeleteSuccess={() => {
            console.log("Deleted schedule successfully");
          }}
          onFormStateChange={(formState) => {
            console.log("Form state changed:", formState);
            // Access form data including dateOverrides: formState.dateOverrides
          }}
       />
    </>
  )
}
```

For a demonstration of the availability settings atom with date overrides, please refer to the video below.

We offer all kinds of customizations to the availability settings atom via props and customClassNames.Below is a list of props that can be passed to the availability settings atom.

| Name | Required | Description |
| --- | --- | --- |
| id | No | The ID of the schedule which fetches a user’s availability |
| labels | No | Helpful if you want to pass in custom labels for i18n |
| customClassNames | No | To pass in custom classnames from outside for styling the atom |
| onUpdateSuccess | No | A callback function to handle updating user availability successfully |
| onBeforeUpdate | No | Validates schedule before it is sent to the server; if true, the schedule is sent, else it is not |
| onUpdateError | No | A callback function that gets triggered when the user availability fails to update |
| onDeleteSuccess | No | A callback function that gets triggered when the user availability is deleted successfully |
| onDeleteError | No | A callback function that gets triggered when the user availability fails to delete |
| onFormStateChange | No | A callback function that gets triggered whenever the form state changes, providing real-time access to form data |
| enableOverrides | No | Allows user to enable or disable date overrides display in the atom; defaults to disabled |
| disableEditableHeading | No | Prevents users from editing the heading |
| allowDelete | No | When set to false, this prop hides the delete button |
| allowSetToDefault | No | When set to false, this prop hides the set to default toggle |
| disableToasts | No | Allows users to enable or disable toast notifications, with the default setting being disabled. |

Along with the props, Availability settings atom accepts custom styles via the **customClassNames** prop. Below is a list of props that fall under this **customClassNames** prop.

| Name | Description |
| --- | --- |
| containerClassName | Adds styling to the whole availability settings component |
| ctaClassName | Adds stylings only to certain call-to-action buttons |
| editableHeadingClassName | Editable heading or title can be styled |
| formClassName | Form which contains the days and toggles |
| timezoneSelectClassName | Adds styling to the timezone select component |
| subtitlesClassName | Styles the subtitle |
| scheduleClassNames | An object for granular styling of schedule components (see detailed table below) |
| dateOverrideClassNames | An object for granular styling of date override components (see detailed table below) |

### scheduleClassNames Object Structure

The `scheduleClassNames` prop accepts an object with the following structure for granular styling of schedule components:

| Property Path | Description |
| --- | --- |
| `schedule` | Styles the entire schedule component |
| `scheduleContainer` | Styles the schedule container |
| `scheduleDay` | Adds styling to just the day of a particular schedule |
| `dayRanges` | Adds styling to day ranges |
| `timeRangeField` | Styles the time range input fields |
| `labelAndSwitchContainer` | Adds styling to label and switches |
| `timePicker` | An object for granular styling of time picker dropdown components (see nested table below) |

#### timePicker Object Structure (nested within scheduleClassNames)

The `timePicker` prop accepts an object with the following structure for granular styling of time picker dropdown components. This applies to the time selection dropdowns (e.g., [ 9:00 ]) that users can click to open a dropdown with available times or click to manually enter a time:

| Property Path | Description |
| --- | --- |
| `container` | Styles the main time picker container |
| `valueContainer` | Styles the container that holds the selected value |
| `value` | Styles the displayed selected time value |
| `input` | Styles the input field for manual time entry |
| `dropdown` | Styles the dropdown menu with time options |

### dateOverrideClassNames Object Structure

The `dateOverrideClassNames` prop accepts an object with the following structure for granular styling of date override components:

| Property Path | Description |
| --- | --- |
| `container` | Styles the main container |
| `title` | Styles the title |
| `description` | Styles the description |
| `button` | Styles the button to add date override |

## Programmatic Form Validation and Submission

The AvailabilitySettings component supports programmatic form validation and submission through a ref-based API. This allows you to validate availability data and submit forms programmatically without user interaction.

```
import { useRef } from 'react';
import { AvailabilitySettings } from "@calcom/atoms";
import type { AvailabilitySettingsFormRef } from "@calcom/atoms";

export function AvailabilityWithValidation() {
  const availabilityRef = useRef<AvailabilitySettingsFormRef>(null);

  const handleValidate = async () => {
    const result = await availabilityRef.current?.validateForm();
    if (result?.isValid) {
      console.log("Availability form is valid");
    } else {
      console.log("Validation errors:", result?.errors);
    }
  };

  const handleSubmit = () => {
    availabilityRef.current?.handleFormSubmit({
      onSuccess: () => {
        // Additional success handling logic here
        console.log('Availability updated successfully');
      },
      onError: (error) => {
        // Additional error handling logic here
        console.error('Error updating availability:', error);
      }
    });
  };

  return (
    <>
      <AvailabilitySettings
        ref={availabilityRef}
        onUpdateSuccess={() => {
          console.log("Updated schedule successfully");
        }}
        onFormStateChange={(formState) => {
          console.log("Form state changed:", formState);
        }}
      />
      <button onClick={handleValidate}>Validate Form</button>
      <button onClick={handleSubmit}>Submit Form</button>
    </>
  );
}
```

### Ref Methods

| Method | Description |
| --- | --- |
| validateForm | Validates the current availability form state and returns a promise with validation results. |
| handleFormSubmit | Programmatically submits the availability form, triggering the same validation and submission flow as clicking the save button. Unlike `validateForm`, this method will check required fields and prevent submission unless all required fields are set |

### Callbacks

The `handleFormSubmit` method accepts an optional callbacks object with the following properties:

```
type AvailabilitySettingsFormCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
```

*   **onSuccess**: Called when the form submission is successful. This allows you to execute additional logic after a successful update.
*   **onError**: Called when an error occurs during form submission. The error parameter contains details about what went wrong, allowing you to handle specific error cases or display custom error messages.

The `validateForm` method returns an `AvailabilityFormValidationResult` object with:

*   `isValid`: Boolean indicating if the form passed validation
*   `errors`: Object containing any validation errors found

**Note:** If a required field is not filled in, the `validateForm` method will not return any error. The validation focuses on the format and consistency of provided data rather than enforcing required field completion.
