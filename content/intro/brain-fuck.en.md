BrainFuck is a minimalistic programming language created by Urban Müller in 1993. The language consists of only eight simple commands and an instruction pointer. Although it is Turing complete, it is not designed for practical use but rather for challenges and entertainment.

**Symbol Syntax**

##### `+` : Increment the value of the current cell pointed by the pointer.

##### `-` : Decrement the value of the current cell pointed by the pointer.

##### `>` : Move the pointer to the right.

##### `<` : Move the pointer to the left.

##### `.` : Output the value of the current cell pointed by the pointer (ASCII).

##### `,` : Input a value and store it in the current cell pointed by the pointer.

##### `[` : If the value of the current cell pointed by the pointer is **zero**, jump to the corresponding `]`.

##### `]` : If the value of the current cell pointed by the pointer is **not zero**, jump to the corresponding `[`.
