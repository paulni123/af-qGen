import { OpenAIStream, StreamingTextResponse } from 'ai'; // Replace this import with the appropriate SDK or library you're using.
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const heartOfAlgebraMapper = {
    "Solving linear equations and linear inequalities": ['j/2 + 7 = 12. What is the value of j in the equation shown above?', 'k/4 + 3 = 14. What is the value of k in the equation shown above?',
        '6 = 2(y+2). What is the value of y in the equation shown above?', '43 = 8c - 5. What is the value of c in the equation shown above?', '41 = 12d - 7. What is the value of d in the equation shown above?'],
    "Interpreting linear functions": ['D = -200t + 9000. Harry took a loan from the bank. Each month, he pays a fixed amount of money back to the bank. The equation above shows the remaining amount of the loan, D, measured in dollars, after t months. How much does Harry pay back to the bank each month, in dollars?',
        "W = 32 - 0.05n; Andrei has a glass tank. First, he wants to put some marbles in it, all of the same volume. Then, he wants to fill the tank with water until it's completely full. The equation shown above describes the volume of water, W, measured in liters, that Andrei should use when there are n marbles. What is the volume of the glass tank, in liters?",
        "R = 42 - 0.7t; Quinn returned home one summer's day to find it extremely hot. He turned the air conditioner on, and the room's temperature began decreasing at a constant rate. The equation shown above gives the room's temperature, R, in degrees Celsius, t minutes after Quinn turned on the air conditioner. What was the room's temperature, in degrees Celsius, when Quinn returned home?",
        "D = -38t + 220; Rachel is driving a race car at a constant speed on a closed course. The formula shown above describes the remaining distance, D, measured in meters, that Rachel has to travel after t seconds. What is Rachel's speed in meters per second?",
        "S = 40,000 + 500c; Caden started a new job selling dental chairs. He earns a base salary plus a commission for every chair he sells. The equation above gives Caden's annual salary, S, in dollars, after selling c dental chairs. Based on the equation above, what is Caden's base salary?"
    ],
    "Linear Equation Word Problems": [
        "John read the first 114 pages of a novel, which was 3 pages less than 1/3 of the novel. If p is the total number of pages in the novel, which of the following equations best describes the situation? Choose 1 answer: (a) (1/3)p - 3 = 114, (b) (1/3)p + 3 = 114, (c) 3p - 3 = 114, (d) 3p + 3 = 114",
        "Jack's mother gave him 50 chocolates to give to his friends at his birthday party. He gave 3 chocolates to each of his friends and still had 2 chocolates left. If x is the number of friends at Jack's party, which of the following equations best describes the situation? Choose 1 answer: (a) 3x + 50 = 2, (b) 2x + 3 = 50, (c) 3x + 2 = 50, (d) 3x - 2 = 50",
        "Felipe is saving money for a class trip. He already has saved $250 that he will put toward the trip. To save more money for the trip, Felipe gets a job where each month he can add $350 to his savings for the trip. Let m be the number of months that Felipe has worked at his new job. If Felipe needs to save $2700 to go on the trip, which equation best models the situation? Choose 1 answer: (A) 250m - 350 = 2700, (B) 250m + 350 = 2700, (C) 350m - 250 = 2700, (D) 350m + 250 = 2700",
        "A pizza delivery worker purchased a used motor scooter that had been driven 12,100 miles. He drives the motor scooter only on days he is working, during which he drives an average of 50 miles per day. After d days of pizza delivery, the motor scooter has been driven a total of 25,000 miles. Which of the following equations best models this situation? Choose 1 answer: (A) 50(12,100 + d) = 25,000, (B) 12,100 + (d/50) = 25,000, (C) 12,100d + 50 = 25,000, (D) 12,100 + 50d = 25,000",
        "An elite runner's stride rate is currently 168 strides per minute (the number of steps she takes per minute). She wants to improve her stride rate to 180, and believes that through training, she can increase her stride rate by 2 strides per minute each day, d. Which equation best models the situation? Choose 1 answer: (A) 168 - 2d = 180, (B) 168 + 2d = 180, (C) 180 - 120d = 168, (D) 180 + 120d = 168",
    ],
    "Linear Inequality Word Problems": [
        "Julia has $5.00 to spend on lemons. Lemons cost $0.59 each, and there is no tax on the purchase. Which of the following inequalities can be used to represent x, the number of lemons Julia can buy? Choose 1 answer: (A) (x/0.59) ≥ 5, (B) (x/0.59) ≤ 5, (C) 0.59x ≥ 5, (D) 0.59x ≤ 5",
        "Dominique is allowed to play up to 8 hours of video games this week. They want to play video games for at least 4 hours this weekend. Which of the following can be used to represent t, the number of hours they can play video games before the weekend? Choose 1 answer: (A) 8 - t ≥ 4, (B) 8 - t ≤ 4, (C) t - 8 ≥ 4, (D) t - 8 ≤ 4",
        "Dorothy is making sausages. If she wants to make at least 24 sausages that weigh 12 ounces each, which of the following best describes x, the total weight of the sausages in ounces? Choose 1 answer: (A) x/12 ≥ 24, (B) x/12 ≤ 24, (C) x - 12 ≥ 24, (D) x - 12 ≤ 24",
        "Anton must finish reading a 369-page book in the next 7 days. Which of the following inequalities can be used to represent x, the average number of pages he must read each day to finish the book on or ahead of schedule? Choose 1 answer: (A) x/7 ≥ 369, (B) x + 7 ≥ 369, (C) 7x ≥ 369, (D) 7x < 369",
        "Victoria is running a fundraising campaign for the local community center. Her goal is to raise more than $5,500. If the campaign has already raised $2,324, which of the following inequalities can be solved to find x, the amount of money that still needs to be raised for Victoria to meet her goal? Choose 1 answer: (A) x - 2,324 > 5,500, (B) 2,324 + x > 5,500, (C) x - 2,324 < 5,500, (D) 2,324 + x < 5,500"
    ],
    "Graphing Linear Equations": [
        "What is the slope of the line represented by the equation 3x - 4y = 7?",
        "What is the slope of the line represented by the equation 2x - 5y = 9?",
        "The equation 8x - 6y = 1 is graphed in the xy-plane. What is the slope of the line?",
        "What is the slope of the line represented by the equation x - 3y = 10?",
        "The equation 2y - 7x = 5 is graphed in the xy-plane. What is the slope of the line?"
    ],
    "Linear Function Word Problems": [
        "A utility service company has a fleet of cars and trucks. The gas tank of each car has a volume of 16 gallons, and the gas tank of each truck has a volume of 30 gallons. If it takes 2,000 gallons of gas to fill the empty gas tanks of the entire fleet, which equation shows the possible number of cars, c, and number of trucks, t, in the fleet? Choose 1 answer: (A) 16t + 30c = 2,000, (B) 30t + 16c = 2,000, (C) t + 30c = 2,000, (D) t + 16c = 2,000",
        "When Lúcia plays golf at the Rolling Hills golf course, she loses about 12 balls on average. When she plays golf at the Meandering Meadows golf course, she loses about 8 balls on average. If Lúcia lost approximately 100 balls after playing at Rolling Hills r times and at Meandering Meadows m times, which of the following equations best represents the relationship between r and m? Choose 1 answer: (A) 8r + 12m = 100, (B) 12r + 8m = 100, (C) 12r - 8m = 100, (D) 8r - 12m = 100",
        "A farmer earns on average $5,000 per acre of raspberries grown and $11,000 per acre of strawberries grown. Which of the following equations shows the relationship between the number of acres of raspberries, r, and the number of acres of strawberries, s, that the farmer can harvest to earn a total of $50,000 from these two crops? Choose 1 answer: (A) 5,000r + 11,000s = 50,000, (B) 11,000r + 5,000s = 50,000, (C) (r/5,000) + (s/11,000) = 50,000, (D) (s/5,000) + (r/11,000) = 50,000",
        "A clothier who only makes shirts and pants can make a shirt in 4 hours and a pair of pants in 6 hours. Which of the following equations shows the number of shirts, s, and the number of pants, p, that the clothier can make in a 40 hour work week? Choose 1 answer: (A) 6s + 4p = 40, (B) 4s + 6p = 40, (C) (s/4) + (p/6) = 40, (D) (s/6) + (p/4) = 40",
        "A farmer has a rectangular plot with a length of l meters and a width of w meters. The total perimeter of the plot is 700 meters. Which equation represents the perimeter of the plot in terms of length and width? Choose 1 answer: (A) 2l + 2w = 700, (B) 2l + 2w = 350, (C) l + w = 700, (D) lw = 700"
    ],
    "Systems of linear inequalities word problems": [
        "In order to bring his business to the next level, Christov wants to gain at least 2,000 followers on a popular social media platform. From his own personal account, he knows that each original post gains him approximately 3 new followers and every 5 reposts gains about 1. Which of the following inequalities represents the numbers of posts, P, and reposts, R, Christov needs to reach his goal of gaining at least 2,000 followers? Choose 1 answer: (A) 3P + 0.2R ≥ 2,000, (B) 3P + 5R ≤ 2,000, (C) 1P + 5R ≥ 2,000, (D) 0.2P + 5R ≤ 2,000",
        "Joe is buying apples and persimmons at the grocery store. Each apple costs $0.99 and each persimmon costs $0.79. If Joe has $10, which of the following inequalities describes x, the number of apples, and y, the number of persimmons, that he can buy? Choose 1 answer: (A) 0.79x + 0.99y ≥ 10, (B) 0.99x + 0.79y ≥ 10, (C) 0.79x + 0.99y ≤ 10, (D) 0.99x + 0.79y ≤ 10",
        "A trivia contest asks both multiple choice and free response questions. Contestants receive 3 points for each correct multiple choice question and 5 points for each correct free response question, and they must score more than 60 points to advance to the next round. If Eva advanced to the next round of the contest, which of the following inequalities describes x, the number of multiple choice questions, and y, the number of free response questions, that she answered correctly? Choose 1 answer: (A) 3x + 5y > 60, (B) 3x + 5y ≥ 60, (C) 3x + 5y < 60, (D) 3x + 5y ≤ 60",
        "Dante commutes to work 4 mornings a week. For his commute each morning, he walks for 10 minutes, waits and rides the bus for x minutes, and waits and rides the train for y minutes. If Dante spends at least 3.5 hours on his morning commute each week, which of the following inequalities best describes Dante's weekly morning commute? Choose 1 answer: (A) x + y + 10 ≥ 3.5(60), (B) x + y + 10 ≥ 3.5(60)(4), (C) 4(x + y) + 10 ≥ 3.5(60), (D) 4(x + y + 10) ≥ 3.5(60)",
        "Vanessa has a $900 travel and lodging budget for her vacation. She found round-trip plane tickets for x dollars total, a hotel for y dollars per night, and free shuttle service between the airport and the hotel. If she plans to stay at the hotel for 5 nights, and she spends less than what she budgeted on travel and lodging, which of the following inequalities best describes the scenario? Choose 1 answer: (A) x + 5y > 900, (B) 5x + y > 900, (C) x + 5y < 900, (D) 5x + y < 900"
    ],
    "Solving Systems of Linear Equations": [
        "The system of equations above has solution (x,y). Equations: x + 3y = 2 and 4x - 3y = 23. What is the value of x? Choose 1 answer: (A) -1, (B) 5, (C) 7, (D) 25.",
        "If (x,y) satisfies the system of equations 3x - 4y = 10 and 2x - 4y = 6, what is the value of y? Choose 1 answer: (A) 1/10, (B) 1/2, (C) 16/5, (D) 4.",
        "Which ordered pair (x,y) satisfies the system of equations 5x - y = 3 and -5x + 2y = 4? Choose 1 answer: (A) (2/5, -1), (B) (4/5, 1), (C) (1, 2), (D) (2, 7).",
        "What is the solution (x,y) to the system of equations x + y = 3 and x - 3y = -9?",
        "The system of equations 3x + y = 3 and 7x - y = 2 has solution (x,y). What is the value of x?"
    ],
    "System of Linear Equations Word Problems": [
        "Ricardo has two types of assignments for his class. The number of mini assignments, m, he has is 1 fewer than twice the number of long assignments, l, he has. If he has 46 assignments in total, which of the following systems of equations can be used to correctly solve for m and l? Choose 1 answer: (A) m=2l-1, m+l=46, (B) m=2l-1, m=l+46, (C) l=2m-1, m+l=46, (D) l=2m-1, m=l+46.",
        "A piece of glass with an initial temperature of 99°C is cooled at a rate of 3.5°C per minute. At the same time, a piece of copper with an initial temperature of 0°C is heated at 2.5°C per minute. Which of the following systems of equations can be used to solve for the temperature, T, in degrees Celsius, and the time, m, in minutes, when the glass and copper reach the same temperatures? Choose 1 answer: (A) T = 99 + 3.5m, T = 2.5m, (B) T = 99 - 3.5m, T = 2.5m, (C) T = 99 + 2.5m, T = 3.5m, (D) T = 99 - 2.5m, T = 3.5m.",
        "Ethan sells e candy bars for $2.50 apiece and Chloe sells c candy bars for $2.00 apiece to raise money for a school trip. Ethan sold 15 fewer candy bars than Chloe, but he also got a $6.00 donation. If Chloe and Ethan raised the same amount of money, which of the following systems could be used to find how many candy bars each sold? Choose 1 answer: (A) 2c = 2.5e + 6, c = e - 15, (B) 2c = 2.5e + 6, e = c - 15, (C) 2c + 6 = 2.5e, c = e - 15, (D) 2c + 6 = 2.5e, e = c - 15",
        "Eva maintained an average speed of 35 mph for the first m hours of her road trip. For the next n hours of the trip, she drove at an average speed of 60 mph. Eva drove a total of 225 miles in 4.5 hours. Which of the following systems of equations could be used to find how many miles Eva drove in the first m hours of the trip? Choose 1 answer: (A) m + n = 225, 35m + 60n = 4.5; (B) m + n = 4.5, 35m + 60n = 225; (C) m + n = 225, 60m + 35n = 4.5; (D) m + n = 4.5, 60m + 35n = 225"
    ],
};

const passportToAdvancedMathMapper = {
    "Solving Quadratic Equations": [
        "72=2x^2; What are the solutions to the equation above? Choose 1 answer: (A) x=6 only, (B) x=−6 and x=6, (C) x=−2+√2 and x=−2−√2, (D) x=−2+√2 and x=−2−√2",
        "3n^2 = 27; What are the solutions to the equation above? Choose 1 answer: (A) n=√3, (B) n=3, (C) n=−√3 and n=√3, (D) n=−3 and n=3",
        "100−121k^2 = 0; What are the solutions to the equation above? Choose 1 answer: (A) k=100/121, (B) k=−100/121 and k=100/121, (C) k=10/11, (D) k=−10/11 and k=10/11",
        "−81x^2 =−11; What are the solutions to the equation above? Choose 1 answer: (A) x=√(11/81), (B) x=−√(11/81) and x=√(11/81), (C) x=−√(11/9) and x=√(11/9), (D) x=√(11/9)",
        "0=32−50x^2; What are the solutions to the equation above? Choose 1 answer: (A) x=4/5, (B) x=−4/5 and x=4/5, (C) x=16/25, (D) x=−16/25 and x=16/25"
    ],
    "Interpreting nonlinear expressions": [
        "h=0.3+5.5t−4.9t^2; What was the height of the football in meters at the moment of the kick?",
        "F(t)=1,500(1.045)^t; The future value in dollars, F(t), of an investment after t years is given by the function defined above. What is the initial value of the investment in dollars?",
        "h(x)=0.000371(x^2 −1,280x)+152; The Golden Gate Bridge is a suspension bridge that consists of two cables hung from two towers of equal height that are 1,280 meters apart. The function above models h, the height of each cable above the ground in meters, as it relates to x, the cable's horizontal distance from the left tower in meters. What is the height of the towers in meters? Choose 1 answer: (A) 640, (B) 152, (C) 0.000371, (D) 1280",
        "c=0.4⋅0.9^m; The zebra mussel, Dreissena polymorpha, filters particulate organic carbon (POC) from water as part of its feeding pattern. The concentration, c, of POC (in milligrams per liter) remaining in a particular bay m months after the introduction of a population of zebra mussels can be estimated using the following equation. According to this estimate, how many milligrams per liter of POC were in the bay when the zebra mussels were first introduced?",
        "A(x)=-1/4(x−25)^2 +625; The area, A(x), of a rectangular enclosure that can be made from a limited amount of fencing is shown above, where x is the length of one of the sides of the enclosure, measured in feet. What is the maximum area that can be enclosed in square feet?"
    ],
    "Quadratic and Exponential Word Problems": [
        "T(t)=22+53(0.74)^t; Poultry should be cooked to a temperature of 75°C. A chicken is removed from the oven and left to rest in a room that is at a constant temperature of 22°C. The temperature of the chicken t hours after it is removed from the oven is given by the exponential function above. What is the approximate temperature of the chicken after 2 hours? Choose 1 answer: (A) 22°C, (B) 51°C, (C) 74°C, (D) 75°C",
        "h(t)=56−4.9t^2; The function above models h, the height of a flower pot in meters, t seconds after it falls from a fourth floor balcony. What is the height of the flower pot, in meters, 3 seconds after it falls? Choose 1 answer: (A) 51.1, (B) 44.1, (C) 36.4, (D) 11.9",
        "f(x)=0.145x^2; The function above models f, the kinetic energy, in joules, of a baseball traveling at a speed of x meters per second. Based on the function, what is the kinetic energy, in joules, of a baseball traveling at a speed of 40 meters per second? Choose 1 answer: (A) 5.8, (B) 58, (C) 232, (D) 2,320",
        "P(t)=1,800(1.004)^t; The function above models P, the amount of money, in dollars, in Yara's savings account t years after she opened the account with an initial deposit of $1,800. How much money is in Yara's account 5 years after her initial deposit if she makes no deposits or withdraws in that time? Choose 1 answer: (A) $1,836.29, (B) $1,873.31, (C) $2,189.98, (D) $9,036",
        "h(t)=-16.1t^2 +100t; The equation above models h, the height of a firework shell in feet, t seconds after launch. What is the height, in feet, of the firework shell 2 seconds after launch? Choose 1 answer: (A) 135.6, (B) 167.8, (C) 232.2, (D) 264.4"
    ],
    "Manipulating quadratic and exponential expressions": [
        "y=2x^2 -5x + 7; If the equation is graphed in the xy-plane, which of the following characteristics of the graph is displayed as a constant or coefficient in the equation? Choose 1 answer: (A) x-intercept(s), (B) y-intercept, (C) x-coordinate of the vertex, (D) y-coordinate of the vertex",
        "y=(x−1)(x+5); If the equation is graphed in the xy-plane, which of the following characteristics of the graph is displayed as a constant in the equation? Choose 1 answer: (A) x-coordinate of the vertex, (B) x-intercept(s), (C) Maximum y-value, (D) y-intercept",
        "y=−(x−1)^2 +3; If the equation is graphed in the xy-plane, which of the following characteristics of the graph is displayed as a constant or coefficient in the equation? Choose 1 answer: (A) y-intercept, (B) x-intercept(s), (C) Minimum y-value, (D) x-coordinate of the line of symmetry",
        "If y = (x + 2)(x + 8) is graphed in the xy-plane, which of the following characteristics of the graph is displayed as a constant in the equation? Choose 1 answer: (A) x-intercept(s), (B) y-intercept, (C) x-coordinate of the vertex, (D) Minimum y-value",
        "If y = - (1/2) x^2 - 9 is graphed in the xy-plane, which of the following characteristics of the graph are displayed as a constant or coefficient in the equation? I. x-intercept(s) II. y-intercept III. y-coordinate of the vertex Choose 1 answer: (A) II only, (B) III only, (C) I and II only, (D) II and III only"
    ],
    "Radical and rational expressions": [
        "b^3 * (b^4)^2 = b^x, what is the value of x? Choose 1 answer: (A) 9, (B) 11, (C) 18, (D) 19",
        "( (1/2)^(-2) +3^0 ) What is the value of the expression above? Choose 1 answer: (A) 3/4, (B) 5/4, (C) 4, (D) 5",
        "((a^3)^3 * a^(-9)) Which of the following expressions is equivalent to the expression above for all a ≠ 0? Choose 1 answer: (A) 0, (B) 1, (C) a^3, (D) a^18",
        "(2y^2 z^10)^5 Which of the following expressions is equivalent to the expression above? Choose 1 answer: (A) 10y^32 z^100,000, (B) 10y^10 z^50, (C) 32y^32 z^100,000, (D) 32y^10 z^50",
        "-(5c)^0 + 7^1 - 2^2 If c ≠ 0, what is the value of the expression above?"
    ],
    "Radical and rational equations": [
        "√x = √(3x) What is the solution to the equation above?",
        "n + 2 = √(a - n) In the equation above, a is a constant. If n = 1 is a solution to the equation, what is the value of a?",
        "7x = 13√x What is the greatest value of x that is a solution to the above equation? Choose 1 answer: (A) 0, (B) 49/169, (C) 169/49, (D) 7/13",
        "w = √(108w) What is the sum of all solutions to the above equation?",
        "√s + 7 = 6 + 4√s What is the solution to the equation above?"
    ],
    "Operations with rational expressions": [
        "3x/(2b) - 5x/(6b) Which of the following expressions is equivalent to the expression above for b ≠ 0 ? Choose 1 answer: (A) −x/(6b), (B) −x/(3b), (C) x/(2b), (D) 2x/(3b)",
        "3/(14y) + y/14 Which expression is equivalent to the above sum for y ≠ 0 ?",
        '(8v/28w+21 − 3v+10/4w+3, "Which expression is equivalent to the above difference? Choose 1 answer:", "A: (8v^2 − 21v + 10) / (24w + 18)", "B: (-13v + 10) / (24w + 18)", "C: (53v + 10) / (28w + 21)", "D: (-13v − 70) / (28w + 21)")',
        "x−5/7 + 5−x/4 is simplified to which expression for all x ≠ 5? Choose 1 answer: (A) 11/(x−5), (B) 11/(5−x), (C) 3/(x−5), (D) 3/(5−x)",
        "x^2/(x−2) + 4/(2−x) is simplified to which expression for all x ≠ 2? Choose 1 answer: (A) x+2, (B) x−2, (C) (x^2−4)/(2−x), (D) (x^2+4)/(x−2)"
    ],
    "Operations With Polynomials": [
        "7n - (4n - 3), which of the following is equivalent to the expression above? Choose 1 answer: (A) 3n + 3, (B) 3n - 3, (C) 11n + 3, (D) 11n - 3",
        "(x−6)(x−1), which of the following is equivalent to the expression above? Choose 1 answer: (A) x^2 - 7x + 6, (B) x^2 + 5x - 7, (C) 2x^2 - 7x + 6, (D) 2x^2 - 7x - 7",
        "(x+4)(x−3), which of the following is equivalent to the expression above? Choose 1 answer: (A) x^2 + x + 1, (B) x^2 + x −12, (C) 2x^2 + x −12, (D) 2x^2 + 7x + 1",
        "(x−4)(x−8), which of the following is equivalent to the expression above? Choose 1 answer: (A) x^2 − 12x + 32, (B) 2x^2 + 4x + 32, (C) x^2 + 4x − 12, (D) 2x^2 − 12x + 32",
        "(x−5)(x+7), which of the following is equivalent to the expression above? Choose 1 answer: (A) x^2 + 2x − 35, (B) x^2 + 2x + 2, (C) x^2 − 35, (D) 2x^2 − 12x − 35"
    ],
    "Polynomial Factors and Graphs": [
        "(x−7)(x+5)(2x−3)=0, Given the polynomial above, what are its zeros? Choose 1 answer: (A) {−7,5,−3}, (B) {7,−5,3}, (C) {−7,5,−3/2}, (D) {7,−5,3/2}",
        "A polynomial function f is defined as f(x) = 3(5x+3)(x+2)(7x-1). Which of the following is a zero of function f? Choose 1 answer: (A) -3, (B) -2, (C) 2, (D) 3",
        "A polynomial function M is defined as M(x) = (2x - 3)(x^2 + 3x + 10). If M(a) = 0 for some real number a, then what is the value of a?",
        "The polynomial function h(t) is defined as h(t) = (t-8)^1(t-4)^2(t-2)^3(t-1)^4. How many distinct zeros does h(t) have?",
        "f(x) = x(6 - x)(x + 1)(x + 2). Which of the following is a zero of the function above? Choose 1 answer: (A) 1, (B) 2, (C) 6, (D) 12"
    ],
    "Non-Linear Equation Graphs": [
        "The equation y = 2x^2 - 7x + 1 is graphed in the xy-plane. What is the y-intercept of the graph? Choose 1 answer: (A) -1, (B) 1, (C) 2, (D) 7",
        "y = (x - 3)(x + 9). The equation above is graphed in the xy-plane. Which of the following are x-intercepts of the graph? Choose 1 answer: (A) -3 and -9, (B) -3 and 9, (C) 3 and -9, (D) 3 and 9",
        "f(x) = (x - 3)^2 - 4. The graph of the function above is a parabola. What are the coordinates of the vertex of the parabola? Choose 1 answer: (A) (-3, -4), (B) (-3, 4), (C) (3, -4), (D) (3, 4)",
        "If the equation y = 2(1.5)^x is graphed in the xy-plane, what are the coordinates of its y-intercept? Choose 1 answer: (A) (0, 0), (B) (0, 1.5), (C) (0, 2), (D) (0, 3)",
        "The function f(x) = (2x - 1)(3x + 7) is graphed in the xy-plane. Which of the following are the coordinates of an x-intercept of the graph? Choose 1 answer: (A) (-3/7, 0), (B) (1/2, 0), (C) (2, 0), (D) (7/3, 0)"
    ],
    "Linear and Quadratic Systems": [
        "A quadratic equation is given by y = (1/2)x^2 - 6. Which of the following equations could be paired with the graphed equation to create a system of equations whose solution set is comprised of the points (2, -4) and (-4, 2)?",
        "A quadratic equation is given by y = (-1/2)x^2 + 2x + 1. Which of the following linear equations combines with the graphed equation to create a system of equations whose solutions are the points (3, 5/2) and (-2, -5)? Choose 1 answer: (A) 3x + 2y = -4, (B) x + 2y = 8, (C) 2x - y = 1, (D) 3x - 2y = 4",
        "Consider the following system of equations: y = -3/5x + 3, y = (x - 5)(x + k) where k is a constant. If the solutions to this system of equations are the points (0, 3) and (5, 0), what is the value of k? Choose 1 answer: (A) 3, (B) -3/5, (C) 3/5, (D) -3",
        "A linear equation is given by y = 2x - 3. Which of the following equations combines with the graphed equation to create a system of equations whose solution set is comprised of the points (-1, -5) and (3, 3)? Choose 1 answer: (A) y = x^2 - 6, (B) y = 6 - x^2, (C) y = 4 - x^2, (D) y = x^2 - 4",
        "A quadratic equation is given by y^2 = 6 - x. Which of the following equations could be paired with the graphed equation to create a system of equations whose solution set is comprised of the points (2, -2) and (-3, 3)? Choose 1 answer: (A) y = x + 6, (B) y = x - 6, (C) y = x, (D) y = -x"
    ],
    "Structure in expressions": [
        "Which of the following is equivalent to the expression x^2 + 11x + 24? A) (x+2)(x+12), B) (x+3)(x+8), C) (x+4)(x+6), D) (x+5)(x+6)",
        "Which of the following is equivalent to the expression x^2 - 5x - 14? A) (x-14)(x+1), B) (x-7)(x+2), C) (x-2)(x+7), D) (x-1)(x+14)",
        "Which of the following is equivalent to the expression x^2 + 3x - 10? A) (x-2)(x-5), B) (x-2)(x+5), C) (x+2)(x-5), D) (x+2)(x+5)",
        "Which of the following is equivalent to the expression x^2 - 8x + 15? A) (x-3)(x-5), B) (x-3)(x+5), C) (x+3)(x-5), D) (x+3)(x+5)",
        "Which of the following is equivalent to the expression x^2 + 30x + 200? A) (x+4)(x+50), B) (x+5)(x+25), C) (x+8)(x+25), D) (x+10)(x+20)"
    ],
    "Isolating Quantities": [
        "Which of the following equations correctly expresses g in terms of f and h? A) g = f / (12h+15), B) g = f / (12h-15), C) g = (f-15) / 12h, D) g = f / 27h",
        "Which of the following equations correctly expresses c in terms of j and m? A) c = (m/j) * 78, B) c = (78*j)/m, C) c = (m/j) * 78, D) c = (78*m)/j",
        "Which of the following equations correctly expresses n in terms of l and m? A) n = (l-125)/(50m), B) n = l/50 - 125/m, C) n = l/50 - 5/(2m), D) n = (5/(2m)) - (l/50)",
        "Which of the following correctly shows the trapezoid's height in terms of its area and two bases? A) h = (A / 2) * (b1+b2), B) h = (a) * ((b1+b2) / 2), C) h = A * (2 * (b1+b2)), D) h = (2A) / (b1+b2)",
        "Which of the following is the correct equation for the distance in terms of the angle and the wavelength? A) d = λ / (2sin(θ)), B) d = 2λ / sin(θ), C) d = λ / (2sin(θ)), D) d = 2λ / sin(θ)"
    ],
    "Function Notation": [
        "If f(x)=3x-1 and g(x)=x^2+1, what is the value of g(f(3))? A) 8, B) 10, C) 29, D) 65",
        "The functions g and h are defined as g(x) = 3x - 7 and h(x) = 2 - g(x). What is the value of h(1)? A) 6, B) 1, C) -2, D) -6",
        "A function f satisfies f(1)=3 and f(3)=7. A function g satisfies g(3)=9 and g(7)=1. What is the value of f(g(7))? A) 1, B) 3, C) 7, D) 9",
        "The functions f and g are defined as f(x) = 1/(x-1) and g(x) = 5x+8. What is the value of f(g(-1))?",
        "If h(x) = x^3 - 4x + 3, what is the value of h(h(2))?"
    ]
};

const problemSolvingAndDataAnalysisMapper = {
    "Ratios rates and proportions": [
        "Elena is conducting a study about the effects of toxins in the water on the hormones of fish. Elena surveys 350 male fish in a river and finds that 150 of the male fish have egg cells growing inside them. According to Elena's survey, what is the ratio of male fish with egg cells to male fish without egg cells in the river? Choose 1 answer: a) 3:4, b) 3:7, c) 4:5, d) 4:7",
        "A geneticist conducts a study to investigate the prevalence of a certain genetic marker in a population of US adults. Out of 1,000 randomly selected adults, 350 have the genetic marker. What is the ratio of adults with the genetic marker to those without? (A) 7:13 (B) 13:7 (C) 7:20 (D) 13:20",
        `What is the musical interval name when the frequency ratio is 480 Hz to 800 Hz? Given intervals: a. Major third (4:5), b. Perfect fourth (3:4), c. Perfect fifth (2:3), d. Major sixth (3:5)`,
        "A piece of wood has a mass of 30g and a volume of 40cm^3. A second piece of wood has the same density and a volume of 240cm^3. What is the mass, in grams, of the second piece of wood?"
    ],
    "Percents": [
        `If 8 men make up 40% of a construction crew, how many people are in the entire crew?`,
        "If 780 W/m^2 of light strike the roof of a greenhouse with 85% transmittance, how many W/m^2 pass through the roof?",
        "If a sample of avocado flesh weighs 10g before dehydration and 1.8g after, what is the percent of dry matter in the sample?",
        "If a bank has $222 million in expenses and an efficiency ratio of 75%, what is its revenue in millions of dollars?",
        "If 18 vanilla cupcakes made by a baker are 17% of the total cupcakes made, how many total cupcakes were made on Wednesday?"
    ],
    "Units": [
        "The Shanghai maglev train travels at a speed of 431 kilometers per hour. Approximately what is the train's speed in miles per hour? (1 mile ≈ 1.61 kilometers) Choose 1 answer: A) 268 B) 370 C) 431 D) 694",
        "Lilia wants to exchange US dollars for Euros before traveling to France. Her bank offers her an exchange rate of 1 US dollar to 0.84 Euros. Approximately how many US dollars does Lilia need to exchange if she wants to receive 350 Euros from her bank? Choose 1 answer: A) 266 B) 294 C) 417 D) 434",
        "A shipping route from Los Angeles to Honolulu is 1,946 nautical miles long. Approximately how long is the route in miles? (1 nautical mile ≈ 1.15 miles) Choose 1 answer: A) 1,692 B) 1,946 C) 2,061 D) 2,238",
        "Petra waited in line for 78 minutes for tickets to see her favorite band. How long did she wait in hours? Choose 1 answer: A) 0.8 B) 1.1 C) 1.3 D) 1.5",
        "Grant and Tim made 8.2 gallons of chili. About how many liters of chili did they make? (1 gallon ≈ 3.785 liters) Choose 1 answer: A) 31 B) 12 C) 4.4 D) 3.8"
    ],
    "Table Data": [
        {
            "id": "1",
            "question": "The table shows data on having a curfew on school nights and having assigned chores at home for the students in Alejandro's class. Which of the following statements about these students is true?",
            "type": "multiple_choice",
            "options": [
                "A) Students who have a curfew are more likely to have chores than students who do not have a curfew.",
                "B) Students who have a curfew are less likely to have chores than students who do not have a curfew.",
                "C) Students who have a curfew are equally likely to have chores as students who do not have a curfew.",
                "D) There is not enough information to determine if students who have a curfew are more likely to have chores than students who do not have a curfew."
            ],
            "correct_answer": "A",
            "whyCorrectAnswer": "A is correct because out of the students who have a curfew (16 total), 12 have chores, whereas out of the students who do not have a curfew (18 total), only 8 have chores.",
            "difficulty": 3,
            "includesVisual": true,
            "visualData": {
                "html": "<table><tr><td></td><td>Have chores</td><td>Do not have chores</td></tr><tr><td>Have a curfew</td><td>12</td><td>4</td></tr><tr><td>Do not have a curfew</td><td>8</td><td>10</td></tr></table>"
            }
        },
        {
            "id": "2",
            "question": "Khaled's eighth-grade class took an exam on two-way frequency tables. After grading the exams, Khaled's teacher made the two-way frequency table below to show the data on completing the exam review sheet and passing the exam. Which of the following statements about these students is true?",
            "type": "multiple_choice",
            "options": [
                "A) Students who did not complete the review sheet were more likely to have passed the exam than students who did complete the review sheet.",
                "B) Students who did not complete the review sheet were less likely to have passed the exam than students who did complete the review sheet.",
                "C) Students who did not complete the review sheet were equally likely to have passed the exam as students who did complete the review sheet.",
                "D) There is not enough information to determine if students who did not complete the review sheet were more likely to have passed the exam than students who did complete the review sheet."
            ],
            "correct_answer": "B",
            "whyCorrectAnswer": "B is correct because out of the 16 students who completed the review sheet, 13 passed the exam, whereas out of the 13 students who did not complete the review sheet, only 4 passed.",
            "difficulty": 3,
            "includesVisual": true,
            "visualData": {
                "html": "<table><tr><td></td><td>Passed the exam</td><td>Did not pass the exam</td></tr><tr><td>Completed the review sheet</td><td>13</td><td>3</td></tr><tr><td>Did not complete the review sheet</td><td>4</td><td>9</td></tr></table>"
            }
        },
        {
            "id": "3",
            "question": "A sociologist polled a random collection of people and asked them their age and annual income. The results are shown in the table to the left. Which of the following is true about the people polled?",
            "type": "multiple_choice",
            "options": [
                "A) People age 44 and under were more likely to earn at least $50,000 than people age 45 and up.",
                "B) People age 44 and under were less likely to earn at least $50,000 than people age 45 and up.",
                "C) People age 44 and under were equally likely to earn at least $50,000 as people age 45 and up.",
                "D) There is not enough information to determine if people age 44 and under were more likely to earn at least $50,000 than people age 45 and up."
            ],
            "correct_answer": "B",
            "whyCorrectAnswer": "B is correct because among people aged 44 and under, 68 out of 216 (148 + 68) earn at least $50,000, while among people aged 45 and up, 94 out of 132 (38 + 94) earn at least $50,000, making it more likely for the older age group.",
            "difficulty": 4,
            "includesVisual": true,
            "visualData": {
                "html": "<table><tr><td></td><td>Less than $50,000</td><td>At least $50,000</td></tr><tr><td>Ages 44 and under</td><td>148</td><td>68</td></tr><tr><td>Ages 45 and under</td><td>38</td><td>94</td></tr></table>"
            }
        },
        {
            "id": "4",
            "question": "Gallup polled a different random collection of 1,500 adults daily over a multi-year span and asked them whether they approve or disapprove of President Obama's performance in office. The two-way frequency table below shows the results on April 27, 2009, and September 3, 2014. Which of the following is true about adults polled during the study?",
            "type": "multiple_choice",
            "options": [
                "A) Adults polled on April 27, 2009, were more likely to approve of President Obama's performance than adults polled on September 3, 2014.",
                "B) Adults polled on April 27, 2009, were less likely to approve of President Obama's performance than adults polled on September 3, 2014.",
                "C) Adults polled on April 27, 2009, were equally likely to approve of President Obama's performance as adults polled on September 3, 2014.",
                "D) There is not enough information to determine if adults polled on April 27, 2009, were more likely to approve of President Obama's performance than adults polled on September 3, 2014."
            ],
            "correct_answer": "A",
            "whyCorrectAnswer": "A is correct because on April 27, 2009, 945 out of 1500 (63%) approved, whereas on September 3, 2014, only 615 out of 1500 (41%) approved, showing a higher approval rate in 2009.",
            "difficulty": 4,
            "includesVisual": true,
            "visualData": {
                "html": "<table><tr><td></td><td>Approved</td><td>Disapproved</td><td>No opinion</td></tr><tr><td>April 27, 2009</td><td>945</td><td>465</td><td>90</td></tr><tr><td>September 3, 2014</td><td>615</td><td>825</td><td>60</td></tr></table>"
            }
        },
        {
            "id": "5",
            "question": "The two-way table at left shows data on age and risk of obesity for all club basketball players aged 18 to 44 in Denver, Colorado. Rounded to the nearest hundredth, what is the probability that a player aged 25 to 44 is at risk of obesity?",
            "type": "multiple_choice",
            "options": [
                "A) 22%",
                "B) 28%",
                "C) 35%",
                "D) 40%"
            ],
            "correct_answer": "B",
            "whyCorrectAnswer": "B is correct because out of the 250 players aged 25 to 44, 70 are at risk of obesity, making the probability \(70/250 = 0.28\) or 28%.",
            "difficulty": 4,
            "includesVisual": true,
            "visualData": {
                "html": "<table><tr><td></td><td>Not at risk of obesity</td><td>At risk of obesity</td><td>Row total</td></tr><tr><td>Age 18 to 24</td><td>400</td><td>50</td><td>450</td></tr><tr><td>Age 25 to 44</td><td>180</td><td>70</td><td>250</td></tr><tr><td>Total</td><td>580</td><td>120</td><td>700</td></tr></table>"
            }
        }
    ],
    "Scatterplots": [
        {
            "id": "1",
            "question": "A panel of judges was asked to judge the quality of different kinds of potato chips. Assuming the line correctly models the trend in the data, what does this line's slope of 5 mean?",
            "type": "multiple_choice",
            "options": [
                "A. The average cost of the chips the judges sampled was $5.",
                "B. The average rating was 5.",
                "C. On average, each $1 increase in cost was associated with a 5 point increase in rating.",
                "D. On average, each $5 increase in cost was associated with a 1 point increase in rating."
            ],
            "correct_answer": "C. On average, each $1 increase in cost was associated with a 5 point increase in rating.",
            "whyCorrectAnswer": "The slope of the trend line represents the rate of change in the rating for each dollar increase in price. A slope of 5 indicates that for each $1 increase in price, the rating increases by 5 points.",
            "difficulty": 2,
            "includesVisual": true,
            "visualData": {
                "scatterplot": {
                    "axesLabels": ["Cost per package ($)", "Average rating"],
                    "trendLine": {
                        "slope": 5,
                        "yIntercept": -5.22
                    },
                    "dataPoints": [
                        [1.1, .9], [1.15, 1.4], [1.4, 1.5], [1.3, 3.5], [1.59, 4.6],
                        [1.7, 5], [1.75, 3.53], [1.78, 5.5], [1.8, 4], [1.9, 6.3],
                        [2, 3.9], [2.03, 4.1], [2.1, 3.6], [2.12, 5.48], [2.14, 6.8],
                        [2.17, 6.3], [2.3, 5], [2.35, 7], [2.4, 5.5], [2.6, 7], [2.7, 8.6]
                    ],
                },
            }
        },
        {
            "id": "2",
            "question": "Adrianna gathered data on different schools' winning percentages and the average yearly salary of their head coaches (in millions of dollars) from 2000-2011. Assuming the line correctly shows the trend in the data, what does it mean that the line's y-intercept is 39?",
            "type": "multiple_choice",
            "options": [
                "A. The average winning percentage was 39%.",
                "B. The average salary was $39 million.",
                "C. On average, each $1 million increase in salary was associated with a 39% increase in winning percentage.",
                "D. The model indicates that teams with coaches who had a salary of $0 million will average a winning percentage of approximately 39%."
            ],
            "correct_answer": "D. The model indicates that teams with coaches who had a salary of $0 million will average a winning percentage of approximately 39%.",
            "whyCorrectAnswer": "The y-intercept of a trend line in a scatter plot represents the expected value of the dependent variable when the independent variable is zero. In this context, a y-intercept of 39 means that if the coach's salary were $0 million, the model predicts the team would have an average winning percentage of 39%.",
            "difficulty": 2,
            "includesVisual": true,
            "visualData": {
                "scatterplot": {
                    "axesLabels": ["Average yearly salary (millions)", "Winning percentage"],
                    "trendLine": {
                        "slope": 10,
                        "yIntercept": 39
                    },
                    "dataPoints": [
                        [1.0, 49.5], [1.5, 54.2], [2.0, 59.8], [2.5, 64.1], [3.0, 69.6],
                        [3.5, 74.9], [4.0, 79.7], [4.5, 84.3], [5.0, 89.0], [5.5, 94.5],
                        [6.0, 99.2], [6.5, 104.8], [7.0, 109.1], [7.5, 114.3], [8.0, 119.9],
                        [8.5, 124.6], [9.0, 129.4], [9.5, 134.2], [10.0, 139.7], [10.5, 144.1],
                        [11.0, 149.3]
                    ],
                }
            }
        },
        {
            "id": "3",
            "question": "The scatterplot shown plots the relationship between hours spent on video games and hours spent on homework last week for students in Joyce's class. Assuming the line correctly shows the trend in the data, what does it mean that the line's y-intercept is 23?",
            "type": "multiple_choice",
            "options": [
                "A. Joyce spent approximately 23 hours on homework.",
                "B. Joyce spent approximately 23 hours on video games.",
                "C. The model indicates that students who spent 23 hours on video games will average approximately 0 hours spent on homework.",
                "D. The model indicates that students who spent 0 hours on video games will average approximately 23 hours spent on homework."
            ],
            "correct_answer": "D. The model indicates that students who spent 0 hours on video games will average approximately 23 hours spent on homework.",
            "whyCorrectAnswer": "The y-intercept of a trend line represents the expected value of the dependent variable when the independent variable is zero. In this context, a y-intercept of 23 suggests that students who spent no hours on video games are expected to have spent an average of 23 hours on homework, according to the model's prediction.",
            "difficulty": 2,
            "includesVisual": true,
            "visualData": {
                "scatterplot": {
                    "axesLabels": ["Hours spent on video games", "Hours spent on homework"],
                    "trendLine": {
                        "slope": -1,
                        "yIntercept": 23
                    },
                    "dataPoints": [
                        [0, 23.0], [1, 21.7], [2, 20.5], [3, 19.2], [4, 18.1],
                        [5, 17.3], [6, 16.8], [7, 15.9], [8, 15.0], [9, 14.2],
                        [10, 13.1], [11, 12.5], [12, 11.6], [13, 10.4], [14, 9.2],
                        [15, 8.5], [16, 7.7], [17, 6.8], [18, 6.0], [19, 4.9],
                        [20, 3.1]
                    ],
                }
            }
        },
        {
            "id": "4",
            "question": "Julio distributed a survey to his fellow students asking them how many hours they spent playing sports in the past day and to rate their mood on a scale from 0 to 10, with 10 being the happiest. The survey results are shown in the graph. Which of the following best interprets the y-intercept of the line of best fit?",
            "type": "multiple_choice",
            "options": [
                "A. Students who had a mood rating of 0 will spend approximately 5 hours playing sports.",
                "B. The average mood rating was 5.",
                "C. Students who had a mood rating of 0 must have spent 5 hours playing sports.",
                "D. Students who spent 0 hours playing sports will have an average mood rating of approximately 5."
            ],
            "correct_answer": "D. Students who spent 0 hours playing sports will have an average mood rating of approximately 5.",
            "whyCorrectAnswer": "The y-intercept of the line of best fit represents the expected value of the dependent variable (mood rating) when the independent variable (hours playing sports) is zero. Therefore, the y-intercept being at 5 suggests that students who did not spend any hours playing sports are predicted to have an average mood rating of 5.",
            "difficulty": 2,
            "includesVisual": true,
            "visualData": {
                "scatterplot": {
                    "axesLabels": ["Hours playing sports", "Average mood"],
                    "trendLine": {
                        "slope": 1.5,
                        "yIntercept": 5
                    },
                    "dataPoints": [
                        [0, 4.8], [0.5, 5.4], [1.0, 6.9], [1.5, 7.2], [2.0, 8.34], [2.5, 8.5],
                        [3.0, 9.5]
                    ],
                }
            }
        },
        {
            "id": "5",
            "question": "Baruti, a ranger in Kruger National Park in South Africa, collected data about the elephant population in the park. She compared the foot lengths of the elephants to their shoulder height and created a scatter plot and trend line. What does this line's slope of 5.89 mean?",
            "type": "multiple_choice",
            "options": [
                "A. The average shoulder height was 5.89 centimeters.",
                "B. The average foot length was 5.89 centimeters.",
                "C. On average, each 1 centimeter increase in foot length was associated with a 5.89 centimeter increase in shoulder height.",
                "D. On average, each 1 centimeter increase in shoulder height was associated with a 5.89 centimeter increase in foot length."
            ],
            "correct_answer": "C. On average, each 1 centimeter increase in foot length was associated with a 5.89 centimeter increase in shoulder height.",
            "whyCorrectAnswer": "The slope of the trend line represents the rate of change in shoulder height for each unit of change in foot length. A slope of 5.89 means that for each 1 centimeter increase in an elephant's foot length, the shoulder height is expected to increase by 5.89 centimeters.",
            "difficulty": 2,
            "includesVisual": true,
            "visualData": {
                "scatterplot": {
                    "axesLabels": ["Foot length (cm)", "Shoulder height (cm)"],
                    "trendLine": {
                        "slope": 5.89,
                        "yIntercept": 0
                    },
                    "dataPoints": [
                        [50.0, 294.5], [51.0, 300.39], [52.0, 306.28], [53.0, 312.17], [54.0, 318.06],
                        [55.0, 323.95], [56.0, 329.84], [57.0, 335.73], [58.0, 341.62], [59.0, 347.51],
                        [60.0, 353.4]
                    ],
                }
            }
        }
    ],
    "Key features of graphs": [

    ],
    "Linear and exponential growth": [

    ],
    "Data inferences": [
        "A study of 120,000 randomly selected photos posted to a social media site determined that 4% were 'selfies,' photos of oneself. If the percent of selfies is consistent throughout the rest of the photos on the site, and there are 20 billion photos, how many billions of photos on the site are selfies?",
        `Sicilia randomly selected 25% of the Sound Sleep email subscribers and asked them how many hours of sleep they average each night. Of the subscribers surveyed, 16 average less than 6 hours of sleep each night. Based on the data, what is the most reasonable estimate of the number of Sound Sleep email subscribers who average less than 6 hours of sleep? Choose 1 answer: A) 16, B) 48, C) 64, D) 400`,
        `Ronald Fast Food randomly selected 20% of locations and asked the manager about the most popular meat. Of the locations surveyed, beef is the most popular meat at 4 locations. Based on the data, what is the most reasonable estimate of the number of Ronald Fast Food locations where the most popular meat is beef? Choose 1 answer: A) 4, B) 12, C) 16, D) 20`,
        `Bernard randomly selected 10% of St. Francis citizens and asked them about their favorite coffee shop. Of the citizens surveyed, 7 said that Energize was their favorite coffee shop. Based on the data, what is the most reasonable estimate of the number of St. Francis citizens whose favorite coffee shop is Energize? Choose 1 answer: A) 7, B) 10, C) 63, D) 70`,
        `Arnaud randomly selected 30% of French International Studies students and asked them if they know how to speak French. Of the students surveyed, 33 know how to speak French. Based on the data, what is the most reasonable estimate of the number of French International Studies students who know how to speak French? Choose 1 answer: A) 10, B) 33, C) 110, D) 231`
    ],
    "Center, spread, and shape of distributions": [

    ],
    "Data collection and conclusions": [
        "City Councilwoman Kelly wants to know whether the residents of her district support a proposed school redistricting plan. Which of the following survey methods will allow Councilwoman Kelly to make a valid conclusion about whether residents of her district support the proposed plan? Choose 1 answer: A) Ask her neighbors. B) Ask the residents of Whispering Pines Retirement Community. C) Ask 200 residents of her district whose names are chosen at random. D) Ask a group of parents at the local playground.",
        "A school district wants to conduct a sample survey to determine the average number of sports played by high school seniors in the district. Which of the following survey methods is most likely to produce valid results? Choose 1 answer: A) The district surveys 500 randomly selected high school seniors in the district who play baseball. B) The district surveys every tenth student to enter the football stadium at the district championship game. C) The district surveys 500 randomly selected high school seniors in the district. D) The district selects one high school in the district and surveys all of its students.",
        "A local package delivery service wants to improve the efficiency of its deliveries. As a first step, the management team decides to conduct a study to determine the average length of time from the arrival of a package at the company's mail center until its delivery at a home. Which of the following methods is most likely to produce valid results? Choose 1 answer: A) The team selects the 1,000 heaviest packages in a one-week, non-holiday period and records how long it takes for each package to reach its destination. B) The team calls 1,000 residents in their delivery area and asks them whether they have received a package from their service in the past week. They will then record how long it took for those packages to reach their destination. C) The team selects a random sample of 1,000 packages arriving at the center over a one-week, non-holiday period and records how long it takes for each package to reach its destination. D) None of the above.",
        "A writer for a high school newspaper is conducting a survey to estimate the number of students that will vote for a particular candidate in an upcoming student government election. All students at the high school are eligible to vote in the election, and the writer decides to select a sample of students to take the survey. Which of the following sampling methods is most likely to produce valid results? Choose 1 answer: A) Survey every fifth student to enter the school library. B) Survey every fifth student to arrive at school one morning. C) Survey every fifth senior to arrive at school one morning. D) Survey every fifth student to enter the school stadium for a football game.",
        "A school district has 40 schools located in different neighborhoods of City Y. A researcher for the school district believes that teacher job satisfaction varies greatly from school to school. Which of the following sampling methods is most appropriate to estimate the proportion of all teachers in the school district who are satisfied with their jobs? Choose 1 answer: A) Surveying the 50 teachers who have taught for the school district the longest. B) Using the first 50 responses from an optional online survey for the teachers. C) Selecting one of the 40 schools at random and then surveying each teacher at the school. D) Selecting 5 teachers from each school at random and then surveying each teacher selected.",
    ]
};

const additionalTopicsInMathMapper = {
    "Volume word problems": [
        "Cam is making a party hat in the shape of a cone for his birthday. The circumference of the part of his head where the hat will rest is 56 cm. If the height of the hat is 25 cm, which of the following is closest to the volume of Cam's hat, measured in cubic centimeters (cm^3)? Choose 1 answer: A) 233 cm^3, B) 2,080 cm^3, C) 16,362 cm^3, D) 20,525 cm^3",
        "A die is created by smoothing the corners of a plastic cube and carving indented pips. The original cube had an edge length of 2 cm. The volume of the final die is 7.5 cm^3. What is the volume of the waste generated by creating the die from the cube in cm^3?",
        "Let's Scream for Ice Cream serves 3 scoops of ice cream in its signature cone. Each scoop is a sphere with a radius of 4 centimeters. To the nearest cubic centimeter, what is the total volume of ice cream served per cone?",
        "A multi-layer cake is in the shape of a right cylinder. The height of the cake is 20 cm, and its radius is 10 cm. If each of the cake layers has a volume of approximately 1,250 cubic centimeters, then how many layers does the cake have?",
        "A paint can in the shape of a right circular cylinder has a height of 20 cm and the circumference of the base of the can is 43.96 cm. To the nearest ten cubic centimeters, what is the approximate volume of the paint can? Choose 1 answer: A) 2,760 cm^3, B) 3,080 cm^3, C) 30,340 cm^3, D) 121,360 cm^3",
    ],
    "Right triangle word problems": [
        "Wanahton is cooking a breadstick on a rectangular baking sheet measuring 9 1/2 inches by 13 inches. Assuming the breadstick width is negligible, what is the longest breadstick Wanahton could bake by fitting it straight along the diagonal and within the baking sheet to the nearest inch? Choose 1 answer: A) 13 in, B) 16 in, C) 124 in, D) 259 in",
        "Due to weather, a barge captain decides to reach her destination in two legs: one due north and one due west. Without a diagram, if the direct route to her destination is about 1,830 miles and after traveling 605 miles due north the captain determines it is time to head due west, how many more miles are left in the trip? (Round the answer to the nearest mile.)",
        "Bilal is assembling a set of bunkbeds and wants to make sure the support posts are perpendicular to the floor. He measures that the posts are 165 cm tall and 220 cm apart. How long should the diagonal measurement be, in cm, if the support posts are perpendicular to the floor? Choose 1 answer: A) 75 cm, B) 130 cm, C) 275 cm, D) 385 cm",
        "A pencil ladder is a compact ladder that firefighters can use in tight spaces. To the nearest foot, what is the height h, in feet, for a pencil ladder that is 11 ft long when its base is 4.5 ft from the supporting wall?",
        "Kaizen's rectangular computer monitor has a diagonal length of 19 inches. If the height of the monitor is 11.9 inches, which of the following is closest to the width of the monitor in inches? Choose 1 answer: A) 7.1, B) 14.8, C) 15.5, D) 22.4"
    ],
    "Congruence and similarity": [
        "Consider two triangles, triangle ABC and triangle BCD, which share a common side BC. The lengths of sides AB and CD are equal, and the lengths of sides AC and BD are also equal. If angle ACB in triangle ABC measures 55 degrees, what is the value of angle x in triangle BCD, which corresponds to angle ACB? Determine the value of x.",
        "Triangle ABC and triangle BCD share a common side BC. The lengths of sides AB and CD are equal, as are the lengths of sides AC and BD. Given these equalities, consider the relationship between triangles ABC and BCD. If angle BAC in triangle ABC measures 92 degrees, what is the value of angle x in triangle BCD, which corresponds to angle BAC when the two triangles are compared? Determine the value of x.",
        "Triangle MNO and triangle PQR are on a plane. Side MN is equal to side PQ, side NO is equal to side QR, and side MO is equal to side PR. If angle MNO measures 75 degrees, what is the measure of angle PQR?",
        "Two triangles, ABC and DEF, have the following properties: AB is congruent to DE, angle BAC is congruent to angle EDF, and AC is congruent to DF. If angle ABC measures 60 degrees, what is the measure of angle DEF?",
        "In a geometric diagram, triangles XYZ and LMN have two pairs of equal sides: XY is equal to LM, and XZ is equal to LN. Also, angle XYZ is equal to angle LMN. If the length of side YZ is 10 cm, what is the length of side MN?"
    ],
    "Right triangle trigonometry": [
        "In a scenario involving two similar triangles, LMN and PQR, if tan(P) = 5/12, what is the value of tan(L)? Choose 1 answer: A) 5/6, B) 5/12, C) 5/13, D) 5/16",
        "In a scenario where triangles RST and XYZ are similar right triangles, which of the following is equal to cos(X)? Choose 1 answer: A) RS/RT, B) ST/RS, C) RS/ST, D) RT/ST",
        "In a scenario where triangles ABC and DEF are similar right triangles, which of the following is equal to tan(C)? Choose 1 answer: A) AB/DE, B) EF/AB, C) DF/DE, D) EF/DE",
        "In a scenario where triangles LMN and PQR are similar, if cos(Q) = 0.3 in triangle PQR, what is the value of cos(M) in triangle LMN?",
        "In triangle ABC, the measure of angle A is 90 degrees, AB = 10, and BC = 16. Triangle DEF is similar to triangle ABC, where vertices D, E, and F correspond to vertices A, B, and C, respectively, and each side of triangle DEF is 2 times the length of the corresponding side of triangle ABC. What is the value of sin(F)?"
    ],
    "Angles, arc lengths, and trig functions": [
        "If theta equals 4 pi over 9 radians, what is the value of theta in degrees? Choose 1 answer: A) 20 degrees, B) 36 degrees, C) 80 degrees, D) 720 degrees",
        "If theta equals 240 degrees, what is the value of theta in radians? Choose 1 answer: A) 2/3 pi, B) 7/6 pi, C) 4/3 pi, D) 3/2 pi",
        "Which of the following radian measures is equal to 135 degrees? Choose 1 answer: A) pi/4 radians, B) pi/2 radians, C) 3 pi/4 radians, D) pi radians",
        "Which of the following radian measures is equal to 30 degrees? Choose 1 answer: A) pi/3 radians, B) pi/6 radians, C) pi/8 radians, D) pi radians",
        "Which of the following radian measures is equal to 300 degrees? Choose 1 answer: A) 2 pi/3 radians, B) 4 pi/3 radians, C) 5 pi/3 radians, D) 7 pi/3 radians"
    ],
    "Circle Theorems": [
        "A circle has an area of 36 pi square units. A sector in this circle has a central angle of 48 degrees. What is the area of this sector? Choose 1 answer: A) 5/24 pi, B) 1/270 pi, C) 270 pi, D) 5/24 pi",
        "A circle has a sector with an area of 24/5 pi square units and a central angle of 192 degrees. What is the area of the circle? Choose 1 answer: A) 1/9 pi, B) 9 pi, C) 75/192 pi, D) 192/75 pi",
        "A circle has a sector with an area of 15 pi square units and a central angle of 216 degrees. What is the area of the circle? Choose 1 answer: A) 1/9 pi, B) 9 pi, C) 1/25 pi, D) 25 pi",
        "A circle with radius 3 units has a sector with a central angle of 160 degrees. What is the area of the sector? Choose 1 answer: A) 1/4 pi, B) 4/81 pi, C) 4 pi, D) 81/4 pi",
        "A circle with area 81 pi square units has a sector with a central angle of 120 degrees. What is the area of the sector? Choose 1 answer: A) 1/243 pi, B) 1/27 pi, C) 27 pi, D) 243 pi"
    ],
    "Circle equations": [
        "A circle in the xy-plane has its center at (44, -34) and radius sqrt(3). Which of the following is an equation of the circle? Choose 1 answer: A) (x + 34)^2 + (y - 44)^2 = 3, B) (x + 34)^2 + (y - 44)^2 = sqrt(3), C) (x - 44)^2 + (y + 34)^2 = 3, D) (x - 44)^2 + (y + 34)^2 = sqrt(3)",
        "A circle in the xy-plane has its center at (-2/3, -3/4) and radius 5. Which of the following is an equation of the circle? Choose 1 answer: A) (x + 2/3)^2 + (y + 3/4)^2 = 5, B) (x - 2/3)^2 + (y + 3/4)^2 = 25, C) (x + 2/3)^2 + (y - 3/4)^2 = 25, D) (x + 2/3)^2 + (y + 3/4)^2 = 25",
        "A circle in the xy-plane has a center at (-12, 15) and a radius of 9 units. Which of the following is an equation of the circle? Choose 1 answer: A) (x - 12)^2 + (y + 15)^2 = 9, B) (x + 12)^2 + (y - 15)^2 = 9, C) (x - 12)^2 + (y + 15)^2 = 81, D) (x + 12)^2 + (y - 15)^2 = 81",
        "A circle in the xy-plane has a center at (-7, -6) and a radius of √13 units. Which of the following is an equation of the circle? Choose 1 answer: A) (x + 7)^2 + (y + 6)^2 = 13, B) (x + 7)^2 + (y + 6)^2 = √13, C) (x - 7)^2 + (y - 6)^2 = 13, D) (x - 7)^2 + (y - 6)^2 = √13",
        "A circle in the xy-plane has a center at (5/8, -6/5) and a diameter of 7/10. Which of the following is an equation of the circle? Choose 1 answer: A) (x + 5/8)^2 + (y - 6/5)^2 = 49/100, B) (x + 5/8)^2 + (y + 6/5)^2 = 49/400, C) (x - 5/8)^2 + (y + 6/5)^2 = 49/100, D) (x - 5/8)^2 + (y - 6/5)^2 = 49/400"
    ],
    "Complex numbers": [
        "For √(-1) = -1i, what is the sum of (3 + √(-1)) + i and (5 + 4√(-1)) + 4i? Choose 1 answer: A) 13, B) 13√13i, C) 8 + 5√8+5i, D) 15 + 4√15+4i",
        "Which of the following is equal to (7+3√(-1)) - (4+√(-1))? Choose 1 answer: A) 5, B) 5√5i, C) 3+2√3+2i, D) 3+4√3+4i",
        "What is the sum of the complex numbers 2 + 4√(-1) + 4i and 3 - 7√(-1) - 7i, where √(-1) = -1√(-1) = -1√(-1) = -1i, equals, square root of, minus, 1, end square root? Choose 1 answer: A) 5 - 3i B) 5 + 11i C) 6 - 28i D) 6 - 3i",
        "For i = √(-1), which of the following is equal to (-3 + 2i) + (-7 + 8i)?",
        "Which of the following complex numbers is equal to (7 - 2i) - (5 - 9i) for i = √(-1)?"
    ]
};

const topicMapper = {
    "heartOfAlgebra": heartOfAlgebraMapper,
    "passportToAdvancedMath": passportToAdvancedMathMapper,
    "problemSolvingAndDataAnalysis": problemSolvingAndDataAnalysisMapper,
    "additionalTopicsInMath": additionalTopicsInMathMapper
};

export const runtime = 'edge';

export async function generateMathQuestions(questionCount, mathTopic, mathSubTopic) {
    const scatterPlotDataDictTemplate = {
        "questions": [
            {
                "id": "1",
                "question": "A panel of judges was asked to judge the quality of different kinds of potato chips. Assuming the line correctly models the trend in the data, what does this line's slope of 5 mean?",
                "type": "multiple_choice",
                "options": [
                    "A. The average cost of the chips the judges sampled was $5.",
                    "B. The average rating was 5.",
                    "C. On average, each $1 increase in cost was associated with a 5 point increase in rating.",
                    "D. On average, each $5 increase in cost was associated with a 1 point increase in rating."
                ],
                "correct_answer": "C. On average, each $1 increase in cost was associated with a 5 point increase in rating.",
                "whyCorrectAnswer": "The slope of the trend line represents the rate of change in the rating for each dollar increase in price. A slope of 5 indicates that for each $1 increase in price, the rating increases by 5 points.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "scatterplot": {
                        "axesLabels": ["Cost per package ($)", "Average rating"],
                        "trendLine": {
                            "slope": 5,
                            "yIntercept": -5.22
                        },
                        "dataPoints": [
                            [1.1, .9], [1.15, 1.4], [1.4, 1.5], [1.3, 3.5], [1.59, 4.6],
                            [1.7, 5], [1.75, 3.53], [1.78, 5.5], [1.8, 4], [1.9, 6.3],
                            [2, 3.9], [2.03, 4.1], [2.1, 3.6], [2.12, 5.48], [2.14, 6.8],
                            [2.17, 6.3], [2.3, 5], [2.35, 7], [2.4, 5.5], [2.6, 7], [2.7, 8.6]
                        ],
                    },
                }
            },
            {
                "id": "2",
                "question": "Adrianna gathered data on different schools' winning percentages and the average yearly salary of their head coaches (in millions of dollars) from 2000-2011. Assuming the line correctly shows the trend in the data, what does it mean that the line's y-intercept is 39?",
                "type": "multiple_choice",
                "options": [
                    "A. The average winning percentage was 39%.",
                    "B. The average salary was $39 million.",
                    "C. On average, each $1 million increase in salary was associated with a 39% increase in winning percentage.",
                    "D. The model indicates that teams with coaches who had a salary of $0 million will average a winning percentage of approximately 39%."
                ],
                "correct_answer": "D. The model indicates that teams with coaches who had a salary of $0 million will average a winning percentage of approximately 39%.",
                "whyCorrectAnswer": "The y-intercept of a trend line in a scatter plot represents the expected value of the dependent variable when the independent variable is zero. In this context, a y-intercept of 39 means that if the coach's salary were $0 million, the model predicts the team would have an average winning percentage of 39%.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "scatterplot": {
                        "axesLabels": ["Average yearly salary (millions)", "Winning percentage"],
                        "trendLine": {
                            "slope": 10,
                            "yIntercept": 39
                        },
                        "dataPoints": [
                            [1.0, 49.5], [1.5, 54.2], [2.0, 59.8], [2.5, 64.1], [3.0, 69.6],
                            [3.5, 74.9], [4.0, 79.7], [4.5, 84.3], [5.0, 89.0], [5.5, 94.5],
                            [6.0, 99.2], [6.5, 104.8], [7.0, 109.1], [7.5, 114.3], [8.0, 119.9],
                            [8.5, 124.6], [9.0, 129.4], [9.5, 134.2], [10.0, 139.7], [10.5, 144.1],
                            [11.0, 149.3]
                        ],
                    }
                }
            },
            {
                "id": "3",
                "question": "The scatterplot shown plots the relationship between hours spent on video games and hours spent on homework last week for students in Joyce's class. Assuming the line correctly shows the trend in the data, what does it mean that the line's y-intercept is 23?",
                "type": "multiple_choice",
                "options": [
                    "A. Joyce spent approximately 23 hours on homework.",
                    "B. Joyce spent approximately 23 hours on video games.",
                    "C. The model indicates that students who spent 23 hours on video games will average approximately 0 hours spent on homework.",
                    "D. The model indicates that students who spent 0 hours on video games will average approximately 23 hours spent on homework."
                ],
                "correct_answer": "D. The model indicates that students who spent 0 hours on video games will average approximately 23 hours spent on homework.",
                "whyCorrectAnswer": "The y-intercept of a trend line represents the expected value of the dependent variable when the independent variable is zero. In this context, a y-intercept of 23 suggests that students who spent no hours on video games are expected to have spent an average of 23 hours on homework, according to the model's prediction.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "scatterplot": {
                        "axesLabels": ["Hours spent on video games", "Hours spent on homework"],
                        "trendLine": {
                            "slope": -1,
                            "yIntercept": 23
                        },
                        "dataPoints": [
                            [0, 23.0], [1, 21.7], [2, 20.5], [3, 19.2], [4, 18.1],
                            [5, 17.3], [6, 16.8], [7, 15.9], [8, 15.0], [9, 14.2],
                            [10, 13.1], [11, 12.5], [12, 11.6], [13, 10.4], [14, 9.2],
                            [15, 8.5], [16, 7.7], [17, 6.8], [18, 6.0], [19, 4.9],
                            [20, 3.1]
                        ],
                    }
                }
            },
            {
                "id": "4",
                "question": "Julio distributed a survey to his fellow students asking them how many hours they spent playing sports in the past day and to rate their mood on a scale from 0 to 10, with 10 being the happiest. The survey results are shown in the graph. Which of the following best interprets the y-intercept of the line of best fit?",
                "type": "multiple_choice",
                "options": [
                    "A. Students who had a mood rating of 0 will spend approximately 5 hours playing sports.",
                    "B. The average mood rating was 5.",
                    "C. Students who had a mood rating of 0 must have spent 5 hours playing sports.",
                    "D. Students who spent 0 hours playing sports will have an average mood rating of approximately 5."
                ],
                "correct_answer": "D. Students who spent 0 hours playing sports will have an average mood rating of approximately 5.",
                "whyCorrectAnswer": "The y-intercept of the line of best fit represents the expected value of the dependent variable (mood rating) when the independent variable (hours playing sports) is zero. Therefore, the y-intercept being at 5 suggests that students who did not spend any hours playing sports are predicted to have an average mood rating of 5.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "scatterplot": {
                        "axesLabels": ["Hours playing sports", "Average mood"],
                        "trendLine": {
                            "slope": 1.5,
                            "yIntercept": 5
                        },
                        "dataPoints": [
                            [0, 4.8], [0.5, 5.4], [1.0, 6.9], [1.5, 7.2], [2.0, 8.34], [2.5, 8.5],
                            [3.0, 9.5]
                        ],
                    }
                }
            },
            {
                "id": "5",
                "question": "Baruti, a ranger in Kruger National Park in South Africa, collected data about the elephant population in the park. She compared the foot lengths of the elephants to their shoulder height and created a scatter plot and trend line. What does this line's slope of 5.89 mean?",
                "type": "multiple_choice",
                "options": [
                    "A. The average shoulder height was 5.89 centimeters.",
                    "B. The average foot length was 5.89 centimeters.",
                    "C. On average, each 1 centimeter increase in foot length was associated with a 5.89 centimeter increase in shoulder height.",
                    "D. On average, each 1 centimeter increase in shoulder height was associated with a 5.89 centimeter increase in foot length."
                ],
                "correct_answer": "C. On average, each 1 centimeter increase in foot length was associated with a 5.89 centimeter increase in shoulder height.",
                "whyCorrectAnswer": "The slope of the trend line represents the rate of change in shoulder height for each unit of change in foot length. A slope of 5.89 means that for each 1 centimeter increase in an elephant's foot length, the shoulder height is expected to increase by 5.89 centimeters.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "scatterplot": {
                        "axesLabels": ["Foot length (cm)", "Shoulder height (cm)"],
                        "trendLine": {
                            "slope": 5.89,
                            "yIntercept": 0
                        },
                        "dataPoints": [
                            [50.0, 294.5], [51.0, 300.39], [52.0, 306.28], [53.0, 312.17], [54.0, 318.06],
                            [55.0, 323.95], [56.0, 329.84], [57.0, 335.73], [58.0, 341.62], [59.0, 347.51],
                            [60.0, 353.4]
                        ],
                    }
                }
            }
        ]
    };

    const tableDataDictTemplate = {
        "questions": [
            {
                "id": "1",
                "question": "During a survey of a high school's student body, the following table was created. Which of the following is true about the student body?",
                "type": "multiple_choice",
                "options": [
                    "A) More students play a musical instrument than participate in a sport.",
                    "B) More students participate in a sport than play a musical instrument.",
                    "C) The number of students who play a musical instrument is equal to those who participate in a sport.",
                    "D) There is not enough information to determine the relationship between students who play a musical instrument and those who participate in a sport."
                ],
                "correct_answer": "B",
                "whyCorrectAnswer": "B because 130 students play a musical instrument (70 + 60) and 200 participate in a sport (110 + 90), so there are more sport participants.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Plays a Musical Instrument</td><td>Does Not Play a Musical Instrument</td></tr><tr><td>Participates in a Sport</td><td>70</td><td>110</td></tr><tr><td>Does Not Participate in a Sport</td><td>60</td><td>90</td></tr></table>"
                }
            },
            {
                "id": "2",
                "question": "A survey was taken to understand commuting preferences among office workers. Which mode of transportation is most favored among the workers surveyed?",
                "type": "multiple_choice",
                "options": [
                    "A) Car",
                    "B) Bus",
                    "C) Train",
                    "D) Walking"
                ],
                "correct_answer": "A",
                "whyCorrectAnswer": "A because the number of workers who use a car, 460 (300 + 160), is greater than any other mode of transportation.",
                "difficulty": 2,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Less than 30 minutes</td><td>More than 30 minutes</td></tr><tr><td>Car</td><td>300</td><td>160</td></tr><tr><td>Bus</td><td>120</td><td>100</td></tr><tr><td>Train</td><td>140</td><td>80</td></tr><tr><td>Walking</td><td>110</td><td>20</td></tr></table>"
                }
            },
            {
                "id": "3",
                "question": "Based on the given class schedule data, how many more students are taking Science than Math if each classroom can handle 30 students?",
                "type": "multiple_choice",
                "options": [
                    "A) 2 classrooms worth of students",
                    "B) 3 classrooms worth of students",
                    "C) 4 classrooms worth of students",
                    "D) 5 classrooms worth of students"
                ],
                "correct_answer": "B",
                "whyCorrectAnswer": "B because there are 360 Science students (12 classes x 30) and 270 Math students (9 classes x 30), which is a difference of 90 students (3 classrooms).",
                "difficulty": 3,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Number of Classes</td></tr><tr><td>Math</td><td>9</td></tr><tr><td>Science</td><td>12</td></tr><tr><td>History</td><td>10</td></tr><tr><td>English</td><td>11</td></tr></table>"
                }
            },
            {
                "id": "4",
                "question": "A survey was conducted to determine the favorite subject among students in eighth grade. Based on the table, what is the ratio of students who prefer Math to those who prefer Science?",
                "type": "multiple_choice",
                "options": [
                    "A) 3:5",
                    "B) 5:3",
                    "C) 2:5",
                    "D) 5:2"
                ],
                "correct_answer": "A",
                "whyCorrectAnswer": "A because there are 150 students who prefer Math and 250 who prefer Science, so the ratio is 150:250, which simplifies to 3:5.",
                "difficulty": 3,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td>Favorite Subject</td><td>Number of Students</td></tr><tr><td>Math</td><td>150</td></tr><tr><td>Science</td><td>250</td></tr><tr><td>English</td><td>200</td></tr><tr><td>History</td><td>100</td></tr></table>"
                }
            },
            {
                "id": "5",
                "question": "A local cinema surveyed patrons on which genre of movie they watched last. If 25% of all patrons surveyed watched a comedy last, how many people were surveyed?",
                "type": "multiple_choice",
                "options": [
                    "A) 320",
                    "B) 360",
                    "C) 400",
                    "D) 440"
                ],
                "correct_answer": "C",
                "whyCorrectAnswer": "C because 25% of the surveyed patrons equal 100 people (the number who watched a comedy last), therefore a total of 400 people were surveyed.",
                "difficulty": 4,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td>Genre</td><td>Number of Patrons</td></tr><tr><td>Action</td><td>150</td></tr><tr><td>Comedy</td><td>100</td></tr><tr><td>Drama</td><td>90</td></tr><tr><td>Sci-Fi</td><td>60</td></tr></table>"
                }
            },
            {
                "id": "6",
                "question": "An airport tracks the number of flights and passengers for two airlines. If the average number of passengers per flight for Airline A is 150 and for Airline B is 180, how many more passengers in total did Airline B carry compared to Airline A?",
                "type": "multiple_choice",
                "options": [
                    "A) 750",
                    "B) 900",
                    "C) 1,050",
                    "D) 1,200"
                ],
                "correct_answer": "B",
                "whyCorrectAnswer": "B because Airline A carried 150 x 20 = 3,000 passengers and Airline B carried 180 x 25 = 4,500 passengers. Hence, Airline B carried 4,500 - 3,000 = 1,500 more passengers.",
                "difficulty": 5,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Number of Flights</td></tr><tr><td>Airline A</td><td>20</td></tr><tr><td>Airline B</td><td>25</td></tr></table>"
                }
            },
            {
                "id": "7",
                "question": "A furniture store had a sale last month and kept data on items sold. Based on the table, how much less revenue did Sofas generate compared to Tables if each table sold for $299 and each sofa for $799?",
                "type": "multiple_choice",
                "options": [
                    "A) $5,000",
                    "B) $8,000",
                    "C) $10,000",
                    "D) $12,000"
                ],
                "correct_answer": "D",
                "whyCorrectAnswer": "D because Table revenue is 299 x 50 = $14,950 and Sofa revenue is 799 x 20 = $15,980. The difference is 15,980 - 14,950 = $1,030.",
                "difficulty": 5,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td>Item</td><td>Units Sold</td></tr><tr><td>Tables</td><td>50</td></tr><tr><td>Sofas</td><td>20</td></tr><tr><td>Chairs</td><td>80</td></tr></table>"
                }
            },
            {
                "id": "8",
                "question": "In a survey on pet ownership, what is the probability that a randomly chosen participant has a dog if it is known that they have at least one pet?",
                "type": "multiple_choice",
                "options": [
                    "A) 1/3",
                    "B) 1/2",
                    "C) 2/3",
                    "D) 3/4"
                ],
                "correct_answer": "C",
                "whyCorrectAnswer": "C because there are 150 participants who have at least one pet (100 with a dog + 50 with a cat), and 100 of those have a dog. So the probability is 100/150 = 2/3.",
                "difficulty": 4,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Has a Dog</td><td>Does Not Have a Dog</td></tr><tr><td>Has a Cat</td><td>30</td><td>50</td></tr><tr><td>Does Not Have a Cat</td><td>70</td><td>80</td></tr></table>"
                }
            },
            {
                "id": "9",
                "question": "A clinic monitored patients who received either medication A or B over a month. On how many more days was medication A administered than medication B?",
                "type": "multiple_choice",
                "options": [
                    "A) 3 days",
                    "B) 5 days",
                    "C) 8 days",
                    "D) 10 days"
                ],
                "correct_answer": "A",
                "whyCorrectAnswer": "A because medication A was administered for 22 days and medication B for 19 days, which results in a difference of 3 days.",
                "difficulty": 3,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Number of Days Administered</td></tr><tr><td>Medication A</td><td>22</td></tr><tr><td>Medication B</td><td>19</td></tr></table>"
                }
            },
            {
                "id": "10",
                "question": "According to the table, what percentage of surveyed smartphone users use Brand X more than Brand Y?",
                "type": "multiple_choice",
                "options": [
                    "A) 45%",
                    "B) 55%",
                    "C) 65%",
                    "D) 75%"
                ],
                "correct_answer": "B",
                "whyCorrectAnswer": "B because there are 110 users of Brand X and 90 of Brand Y. Therefore, Brand X is preferred by (110 / (110 + 90)) x 100% = 55% of the users.",
                "difficulty": 4,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td>Brand</td><td>Number of Users</td></tr><tr><td>Brand X</td><td>110</td></tr><tr><td>Brand Y</td><td>90</td></tr></table>"
                }
            },
            {
                "id": "11",
                "question": "The two-way frequency table records the number of phones sold by two stores over the weekend. If each phone was sold for the same price, which store made more in sales and by how much?",
                "type": "multiple_choice",
                "options": [
                    "A) Store A by $3,000",
                    "B) Store A by $4,500",
                    "C) Store B by $3,000",
                    "D) Store B by $4,500"
                ],
                "correct_answer": "A",
                "whyCorrectAnswer": "A because Store A sold 60 phones and Store B sold 40 phones. If each phone was sold for the same price, then assuming a price of $150 per phone, Store A sold $9,000 worth of phones and Store B $6,000, so Store A made $3,000 more.",
                "difficulty": 4,
                "includesVisual": true,
                "visualData": {
                    "html": "<table><tr><td></td><td>Saturday</td><td>Sunday</td></tr><tr><td>Store A</td><td>30</td><td>30</td></tr><tr><td>Store B</td><td>20</td><td>20</td></tr></table>"
                }
            }
        ]
    }

    const dataDictTemplate = {
        "questions": [
            {
                "id": "1",
                "question": "If (3y - 11)/4 = 7, what is the value of y?",
                "type": "multiple_choice",
                "options": [
                    "A. 12",
                    "B. 13",
                    "C. 14",
                    "D. 15"
                ],
                "correct_answer": "D. 15",
                "whyCorrectAnswer": "Solving for y gives us: 4 * 7 + 11 = 3y, then y = 15.",
                "difficulty": 2,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "2",
                "question": "If 2x + 3(x + 4) = 42, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 4",
                    "B. 6",
                    "C. 8",
                    "D. 10"
                ],
                "correct_answer": "B. 6",
                "whyCorrectAnswer": "Solving for x gives us: 2x + 3x + 12 = 42, then 5x = 30 and x = 6.",
                "difficulty": 2,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "3",
                "question": "If 7y + 2 = 2(y + 12), what is the value of y?",
                "type": "multiple_choice",
                "options": [
                    "A. 4",
                    "B. 5",
                    "C. 6",
                    "D. 7"
                ],
                "correct_answer": "B. 4",
                "whyCorrectAnswer": "Solving for y gives us: 7y - 2y = 24 - 2, then 5y = 22 and y = 4.4",
                "difficulty": 3,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "4",
                "question": "If 12 - 4x = 2x, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 1",
                    "B. 2",
                    "C. 3",
                    "D. 4"
                ],
                "correct_answer": "B. 2",
                "whyCorrectAnswer": "Solving for x gives us: 12 = 6x, then x = 2.",
                "difficulty": 3,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "5",
                "question": "If 5(x - 3) - 2x = 15, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 5",
                    "B. 6",
                    "C. 7",
                    "D. 8"
                ],
                "correct_answer": "C. 7",
                "whyCorrectAnswer": "Solving for x gives us: 5x - 15 - 2x = 15, then 3x = 30 and x = 10.",
                "difficulty": 4,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "6",
                "question": "If (2x + 8)/2 = 3(x - 4), what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 6",
                    "B. 7",
                    "C. 8",
                    "D. 9"
                ],
                "correct_answer": "C. 8",
                "whyCorrectAnswer": "Solving for x gives us: x + 4 = 3x - 12, then 2x = 16 and x = 8.",
                "difficulty": 4,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "7",
                "question": "If 3(4z - 7) = 4(3z + 8), what is the value of z?",
                "type": "multiple_choice",
                "options": [
                    "A. 28",
                    "B. 29",
                    "C. 30",
                    "D. 31"
                ],
                "correct_answer": "A. 28",
                "whyCorrectAnswer": "Solving for z gives us: 12z - 21 = 12z + 32, then z = 28.",
                "difficulty": 4,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "8",
                "question": "If 15 = 5/x + x, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 2",
                    "B. 3",
                    "C. 4",
                    "D. 5"
                ],
                "correct_answer": "B. 3",
                "whyCorrectAnswer": "Solving for x gives us: 5/x = 15 - x, then 5 = 15x - x^2, and so x = 3. ",
                "difficulty": 5,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "9",
                "question": "If 4/(x+1) + 3/(x-2) = 1, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 5",
                    "B. 6",
                    "C. 7",
                    "D. 8"
                ],
                "correct_answer": "B. 6",
                "whyCorrectAnswer": "To solve this equation, write the fractions as 4x-8+3x-3 = (x+1)(x-2), so x = 6",
                "difficulty": 5,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "10",
                "question": "If (3x - 2)(x + 2) = 3, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 1",
                    "B. 2",
                    "C. 3",
                    "D. 4"
                ],
                "correct_answer": "A. 1",
                "whyCorrectAnswer": "The equation simplifies to 3x^2 + 4x - 4 = 3, so x^2 + 4x/3 - 1 = 0, and the denominator goes to x = 1 or x = -3.",
                "difficulty": 5,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            },
            {
                "id": "11",
                "question": "If \u221a(4x + 16) = x + 4, what is the value of x?",
                "type": "multiple_choice",
                "options": [
                    "A. 2",
                    "B. 3",
                    "C. 4",
                    "D. 5"
                ],
                "correct_answer": "A. 2",
                "whyCorrectAnswer": "Squaring both sides gives 4x + 16 = x^2 + 8x + 16, and simplifying yields x^2 + 4x = 0, so x = 2.",
                "difficulty": 5,
                "includesVisual": false,
                "visualData": {
                    html: `<table>...Include only if the question category is of Table Data`, scatterplot: {
                        "axesLabels": ["X", "Y"],
                        "trendLine": {
                            "slope": 145,
                            "yIntercept": 151
                        },
                        "dataPoints": [

                        ],
                    }
                },
            }
        ]
    };

    const newString = JSON.stringify(dataDictTemplate, null, 4);

    const system_msg = `You are an AI agent designed to generate SAT level difficulty math questions for a given category of math. "
    Ensure that these questions cover the breadth of the passage and that they can help augment SAT test taker's reading comprehension ability.
    Ensure that the questions vary in difficulty, from 1 to 5, where 1 is easy and 5 is very difficult, and help challenge prospective test takers.
    I want a format similar to ${newString} and make sure it has the right amount of questions as specified. Output the questions and answers as JSON.`

    const user_content1 = `Given the category: ${"Solving linear equations and linear inequalities"}, generate a suite of 11 SAT Math questions, each with 4 answer choices. For each question, provide:

    1. **question**: Clearly state the problem to be solved.
    2. **options**: Offer four distinct answer options.
    3. **correct_answer**: Identify the correct option.
    4. **whyCorrectAnswer**: Give a brief explanation for why the correct answer is the best choice.
    5. **difficulty**: Assign an estimated difficulty level to each question, making sure they are significantly harder than the examples.
    6. **includesVisual** Assign an boolean to each question whether it contains a visual. 
    7. **visualData** Indicate metadata for the visualContent only if the question includes a visual

    Use the sample questions from the category "Solving linear equations and linear inequalities" available in ${heartOfAlgebraMapper["Solving linear equations and linear inequalities"]} as a reference. However, ensure that the new questions you generate are more challenging and differ substantially in terms of content, structure, and complexity.

    In cases where the questions involve visual elements such as graphs, charts, or HTML representations:

    - **Unique Visual Data**: Create unique and different visual data for each question, ensuring no repetition from the sample questions.
    - **Consistency**: Ensure that the visual data is consistent with the question text and the correct answer.
    - **Clarity and Relevance**: The visual elements should be clear, relevant to the question, and should add value to the understanding or solving of the problem.

    The goal is to create a diverse set of challenging questions that thoroughly test the understanding of "Solving linear equations and linear inequalities" while providing educational value and variety in presentation and difficulty.`;

    const assistant_content_1 = JSON.stringify(dataDictTemplate, null, 4);

    const user_content2 = `Given the category: ${"Scatterplots"}, generate a suite of ${11} SAT Math questions focused on scatterplots, along with 4 answer choices for each question. Each question should include:

    1. **question**: Clearly state the problem to be solved.
    2. **options**: Offer four distinct answer options.
    3. **correct_answer**: Identify the correct option.
    4. **whyCorrectAnswer**: Give a brief explanation for why the correct answer is the best choice.
    5. **difficulty**: Assign an estimated difficulty level to each question, making sure they are significantly harder than the examples.
    6. **includesVisual** Assign an boolean to each question whether it contains a visual. 
    7. **visualData** Indicate metadata for the visualContent only if the question includes a visual

    Use the sample questions in JSON format from ${problemSolvingAndDataAnalysisMapper["Scatterplots"]} as a base, but create more challenging questions. Ensure that the new questions are distinct in content yet test the same concepts as the original questions.

    For each scatterplot question, generate a set of 10-15 data points. These points should be consistent with the trend line, which means:

    Trend Line Specification: Clearly define a trend line for each scatterplot question.

    Data point generation: Generate data points by plugging in a range of x-values into the trend line equation to calculate corresponding y-values. Choose x-values that span a reasonable range relevant to the context of the question.
    Ensure that the data points are spread across the entire length of the trend line to provide a comprehensive representation of the trend.

    Variance Guidelines: Introduce a realistic degree of variance in the data points. This means that while the points should generally follow the trend line, they should not all lie exactly on it.
    Implement a method to vary each point slightly from the trend line. For instance, add or subtract a small, randomly chosen value (within a specified range) to the y-value of each point. This deviation should be minor enough to maintain the overall trend, but noticeable enough to reflect real-world data variability.

    Visualization and Consistency: When visualizing these data points on a scatterplot, ensure that the graphical representation is consistent with the generated data. The trend line should be clearly marked, and the data points should visually align with the described variance.
    Contextual Relevance:

    Make sure that the trend line and data points are contextually relevant to the question being posed. The range of values and the nature of the variance should make sense within the scenario presented in the question.
    `;

    const assistant_content_2 = JSON.stringify(scatterPlotDataDictTemplate, null, 4);

    const user_content3 = `Given the category: ${"Table Data"}, generate a suite of 11 SAT Math questions, each with 4 answer choices. For each question, provide:

    1. **question**: Clearly state the problem to be solved.
    2. **options**: Offer four distinct answer options.
    3. **correct_answer**: Identify the correct option.
    4. **whyCorrectAnswer**: Give a brief explanation for why the correct answer is the best choice.
    5. **difficulty**: Assign an estimated difficulty level to each question, making sure they are significantly harder than the examples.
    6. **includesVisual** Assign an boolean to each question whether it contains a visual. 
    7. **visualData** Indicate metadata for the visualContent only if the question includes a visual

    Use the sample questions from the category ${"Table Data"} available in ${problemSolvingAndDataAnalysisMapper["Table Data"]} as a reference. However, ensure that the new questions you generate are more challenging and differ substantially in terms of content, structure, and complexity.

    In cases where the questions involve visual elements such as graphs, charts, or HTML representations:

    - **Unique Visual Data**: Create unique and different visual data for each question, ensuring no repetition from the sample questions.
    - **Consistency**: Ensure that the visual data is consistent with the question text and the correct answer.
    - **Clarity and Relevance**: The visual elements should be clear, relevant to the question, and should add value to the understanding or solving of the problem.

    The goal is to create a diverse set of challenging questions that thoroughly test the understanding of ${"Table Data"} while providing educational value and variety in presentation and difficulty.`;

    const assistant_content_3 = JSON.stringify(tableDataDictTemplate, null, 4);

    let user_content4 = `Given the category: ${mathSubTopic}, generate a suite of 11 SAT Math questions, each with 4 answer choices. For each question, provide:

    1. **question**: Clearly state the problem to be solved.
    2. **options**: Offer four distinct answer options.
    3. **correct_answer**: Identify the correct option.
    4. **whyCorrectAnswer**: Give a brief explanation for why the correct answer is the best choice.
    5. **difficulty**: Assign an estimated difficulty level to each question, making sure they are significantly harder than the examples.
    6. **includesVisual** Assign an boolean to each question whether it contains a visual. 
    7. **visualData** Indicate metadata for the visualContent only if the question includes a visual

    Use the sample questions from the category ${mathSubTopic} available in ${topicMapper[mathTopic][mathSubTopic]} as a reference. However, ensure that the new questions you generate are more challenging and differ substantially in terms of content, structure, and complexity.

    In cases where the questions involve visual elements such as graphs, charts, or HTML representations:

    - **Unique Visual Data**: Create unique and different visual data for each question, ensuring no repetition from the sample questions.
    - **Consistency**: Ensure that the visual data is consistent with the question text and the correct answer.
    - **Clarity and Relevance**: The visual elements should be clear, relevant to the question, and should add value to the understanding or solving of the problem.

    The goal is to create a diverse set of challenging questions that thoroughly test the understanding of ${mathSubTopic} while providing educational value and variety in presentation and difficulty.`;

    if (mathSubTopic === 'Scatterplots') {
        user_content4 = `Given the category: ${mathSubTopic}, generate a suite of ${questionCount} SAT Math questions focused on scatterplots, along with 4 answer choices for each question. Each question should include:

        1. **question**: Clearly state the problem to be solved.
        2. **options**: Offer four distinct answer options.
        3. **correct_answer**: Identify the correct option.
        4. **whyCorrectAnswer**: Give a brief explanation for why the correct answer is the best choice.
        5. **difficulty**: Assign an estimated difficulty level to each question, making sure they are significantly harder than the examples.
        6. **includesVisual** Assign an boolean to each question whether it contains a visual. 
        7. **visualData** Indicate metadata for the visualContent only if the question includes a visual

            Use the sample questions in JSON format from ${topicMapper[mathTopic][mathSubTopic]} as a base, but create more challenging questions. Ensure that the new questions are distinct in content yet test the same concepts as the original questions.

            For each scatterplot question, generate a set of 10-15 data points. These points should be consistent with the trend line, which means:

    Trend Line Specification: Clearly define a trend line for each scatterplot question.

    Data point generation: Generate data points by plugging in a range of x-values into the trend line equation to calculate corresponding y-values. Choose x-values that span a reasonable range relevant to the context of the question.
    Ensure that the data points are spread across the entire length of the trend line to provide a comprehensive representation of the trend.

    Variance Guidelines: Introduce a realistic degree of variance in the data points. This means that while the points should generally follow the trend line, they should not all lie exactly on it.
    Implement a method to vary each point slightly from the trend line. For instance, add or subtract a small, randomly chosen value (within a specified range) to the y-value of each point. This deviation should be minor enough to maintain the overall trend, but noticeable enough to reflect real-world data variability.
    
    Visualization and Consistency: When visualizing these data points on a scatterplot, ensure that the graphical representation is consistent with the generated data. The trend line should be clearly marked, and the data points should visually align with the described variance.
    Contextual Relevance:

    Make sure that the trend line and data points are contextually relevant to the question being posed. The range of values and the nature of the variance should make sense within the scenario presented in the question.          `;
    }

    try {
        console.log("Generating Math questions...");

        const response = await openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            stream: true,
            response_format: { type: "json_object" },
            messages: [
                { "role": "system", "content": system_msg },
                { "role": "user", "content": user_content1 },
                { "role": "assistant", "content": assistant_content_1 },
                { "role": "user", "content": user_content2 },
                { "role": "assistant", "content": assistant_content_2 },
                { "role": "user", "content": user_content3 },
                { "role": "assistant", "content": assistant_content_3 },
                { "role": "user", "content": user_content4 }
            ]
        });

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred while generating the question" });
    }
}
