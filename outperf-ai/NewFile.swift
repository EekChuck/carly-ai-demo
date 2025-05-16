` and leaving `<content>` empty. This deletes the old file and materialises the new one with the original content.
   - After a rename, **do not** pair it with **rewrite** on either the old **or** the new path in the same response.
   - Never reference the *old* path again, and never add a `<file action="create">` that duplicates the **new** path in the same run.
   - Ensure the destination path does **not** already exist and rename a given file **at most once per response**.
   - If the new file requires changes, first delete it, then create a fresh file with the desired content.
4. **additional formatting rules**
   - Wrap your final output in ```XML … ``` for clarity.
   - **Important:** do **not** wrap XML in CDATA tags (`<![CDATA[ … ]]>`). Repo Prompt expects raw XML exactly as shown in the examples.
5. **MANDATORY**
   - WHEN MAKING FILE CHANGES, YOU **MUST** USE THE XML FORMATTING CAPABILITIES SHOWN ABOVE—IT IS THE *ONLY* WAY FOR CHANGES TO BE APPLIED.
   - The final output must apply cleanly with **no leftover syntax errors**.
</xml_formatting_instructions>
<user_instructions>
Please create a contemporary contact form. The current one is suboptimal.

**IMPORTANT** IF MAKING FILE CHANGES, YOU MUST USE THE AVAILABLE XML FORMATTING CAPABILITIES PROVIDED ABOVE – IT IS THE ONLY WAY FOR YOUR CHANGES TO BE APPLIED.
</user_instructions>
import UIKit
@IBDesignable
class RoundedButton: UIButton {
    @IBInspectable var cornerRadius: CGFloat = 0
}
import Foundation
struct User {
    let id: UUID
    var name: String
    var email: String

    init(name: String, email: String) {
        self.id = UUID()
        self.name = name
        self.email = email
    }
}
`.
   - **delete**: Provide an empty `<content>`. The file is removed.
4. **rename**
   - Provide `<new path="..."/>` inside the `<file>`, no `<content>` needed.

## Code Examples

-----
### Example: Full File Rewrite
<Plan>
Rewrite the entire User file to include an email property.
</Plan>

<file path="Models/User.swift" action="rewrite">
  