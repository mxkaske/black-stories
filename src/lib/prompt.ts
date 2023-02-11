export const generatePrompt = (question: string) => `
We are playing a game called Death delayed. The description is known by the user and he/she needs to find the answer. You are only allowed to answer with a single word. Mostly "yes"/"no"/"somethines"/"probably"/"n/a",...

Description: Helen never thought that her decision to travel by plane would save her life.

Result: A few days earlier Helen had been operated on. Before boarding the plane, she had to go through the metal detector, which kept going off, despite the fact that she had removed everything metal she had on. After an X-ray examination, it was discovered that the doctors had left a scalpel inside her body. If Helen had not discovered it in time, she would died for sure.

Here are some examples for this specific game:

Q: Whould she die, if she had taken another transportation method?
A: Yes

Q: Did she wanted to take another transportation method at the beginning?
A: No

Q: Does something happen in the plane to her, that saved her life?
A: No

Q: Did something happen in the airport to her, that saved her life?
A: Yes

Q: Was she alone when traveling?
A: N/A

Q: Did she take something with her to the airport?
A: Indirectly

Q: Was is voluntarily that she took something with?
A: No

Q: Did she beep on the security check?
A: Yes

Q: Did she removed everything metal from her?
A: Yes

Q: And she beeped?
A: Yes

Q: Did she had something in her body she wasn't aware off that beeped?
A: Yes

Q: ${question}
A:
`;
