
import { Course, Unit, Lesson, ContentBlock, QuizQuestion } from "../types";

export const GRADE_LEVELS = {
  ELEMENTARY: ["K", "1", "2", "3", "4", "5"],
  MIDDLE: ["6", "7", "8"],
  HIGH: ["9", "10", "11", "12"]
};

export const SUBJECTS = ["Math", "Science", "ELA", "Social Studies", "Electives"];

const CURRICULUM_MAP: Record<string, Record<string, string[]>> = {
  "8": {
    "Math": ["Irrational Numbers", "Exponents & Roots", "Linear Equations", "Functions Basics", "Pythagorean Theorem", "Scatter Plots"],
    "Science": ["Atoms and Elements", "The Periodic Table", "Sound and Light Waves", "Natural Selection", "Plate Tectonics", "Stars and Galaxies"],
    "ELA": ["Advanced Literary Analysis", "Research Methodology", "Modernism", "Journalism", "Debate Skills", "Speech Writing"],
    "Social Studies": ["The Early Republic", "Manifest Destiny", "Reconstruction", "The Gilded Age", "Modern Geopolitics", "The Digital Age"]
  },
  "9": {
    "Math": ["Algebra 1 Foundations", "Linear Functions", "Quadratic Equations", "Systems of Equations", "Exponential Growth", "Radical Expressions"],
    "Science": ["Biology Foundations", "Cellular Biology", "Genetics & DNA", "Ecology", "Human Anatomy", "Biological Evolution"],
    "ELA": ["World Literature", "Epic Poetry", "Short Story Analysis", "MLA Formatting", "Vocabulary Expansion", "Literary Criticism"],
    "Social Studies": ["World History Part 1", "Early Civilizations", "Imperialism", "The Industrial Revolution", "Nationalism", "Global Conflicts"]
  },
  "10": {
    "Math": ["Geometry Proofs", "Circles and Volume", "Trigonometry Basics", "Probability & Logic", "Coordinate Geometry", "Similarity"],
    "Science": ["Chemistry Basics", "Stoichiometry", "The Mole Concept", "Gas Laws", "Solutions and Acids", "Organic Chemistry"],
    "ELA": ["English Literature", "Medieval Classics", "Renaissance Writers", "Shakespearean Study", "Gothic Fiction", "The Novel Form"],
    "Social Studies": ["World History Part 2", "WWI and WWII", "The Cold War", "Decolonization", "Modern Geopolitics", "Human Rights"]
  },
  "11": {
    "Math": ["Algebra 2 & Trig", "Complex Numbers", "Logarithmic Functions", "Conic Sections", "Sequence and Series", "Matrix Algebra"],
    "Science": ["Physics Dynamics", "Force and Motion", "Fluid Mechanics", "Thermodynamics", "Electricity", "Optics"],
    "ELA": ["American Literature", "The Transcendentalists", "Harlem Renaissance", "Post-War Realism", "Beat Generation", "Contemporary Fiction"],
    "Social Studies": ["Modern US History", "Industrialization", "The World Wars", "The Civil Rights Era", "Vietnam & Cold War", "21st Century Issues"]
  },
  "12": {
    "Math": ["Calculus AB/BC", "Limits and Continuity", "Differentiation", "Integration", "Vector Calculus", "Multivariable Study"],
    "Science": ["Environmental Science", "Ecology & Energy", "Pollution Control", "Sustainability", "Population Science", "Atmospheric Study"],
    "ELA": ["Comparative Literature", "Poetry Through Ages", "Post-Colonial Texts", "Literary Theory", "Advanced Rhetoric", "Senior Capstone"],
    "Social Studies": ["US Gov & Economics", "The Constitution", "Microeconomics", "Macroeconomics", "Elections & Policy", "Foreign Relations"]
  }
};

const TOPIC_DETAILS: Record<string, { def: string, why: string, obj: string[], prob: string, steps: string[], quiz: QuizQuestion[] }> = {
  // --- GRADE 8 MATH ---
  "irrational numbers": {
    def: "A set of numbers that cannot be expressed as a simple fraction a/b. Their decimal forms never end and never repeat, unlike rational numbers.",
    why: "Essential for exact calculations in geometry, such as finding the diagonal of a square or the circumference of a circle (Pi).",
    obj: ["Distinguish between rational and irrational values", "Estimate the value of irrational square roots", "Position pi and other roots on a number line"],
    prob: "Evaluate whether the square root of 26 is rational or irrational and estimate its value.",
    steps: ["Find perfect squares near 26: 25 (5²) and 36 (6²).", "√25 < √26 < √36, so the value is between 5 and 6.", "Since 26 is very close to 25, the estimate is approximately 5.1.", "Since 26 is not a perfect square, its root is a non-terminating decimal.", "Conclusion: Irrational."],
    quiz: [{ id: "8_m_irr_1", text: "Which of the following is an irrational number?", options: ["√2", "0.75", "2/3", "√16"], correctIndex: 0, explanation: "Square roots of non-perfect squares are irrational. √16 is 4, which is rational." }]
  },
  "exponents & roots": {
    def: "Exponents represent repeated multiplication of a base, while roots (like square or cube roots) represent the inverse operation—finding the base from the product.",
    why: "Used to express very large or small numbers in scientific notation and to calculate compound growth in finance.",
    obj: ["Apply product and quotient rules for exponents", "Simplify expressions with zero and negative exponents", "Solve equations involving squares and cubes"],
    prob: "Simplify the expression: (4³ * 4⁻²) / 4⁻¹.",
    steps: ["Use the product rule for the numerator: 3 + (-2) = 1, so 4¹.", "Divide by the denominator: 4¹ / 4⁻¹.", "Use the quotient rule: 1 - (-1) = 2.", "Calculate final value: 4² = 16."],
    quiz: [{ id: "8_m_exp_1", text: "What is the value of any non-zero number raised to the power of 0?", options: ["1", "0", "The number itself", "Undefined"], correctIndex: 0, explanation: "By definition, x⁰ = 1 for all x ≠ 0." }]
  },
  "linear equations": {
    def: "An algebraic equation where each term is either a constant or the product of a constant and a single variable. When graphed, they always form a straight line.",
    why: "Critical for predicting trends where things change at a steady rate, like hourly wages or fuel consumption over distance.",
    obj: ["Solve multi-step linear equations", "Interpret slope and y-intercept in context", "Graph equations in y = mx + b form"],
    prob: "Solve for x in the equation: 5x - 7 = 3(x + 1).",
    steps: ["Distribute the 3: 5x - 7 = 3x + 3.", "Subtract 3x from both sides: 2x - 7 = 3.", "Add 7 to both sides: 2x = 10.", "Divide by 2: x = 5."],
    quiz: [{ id: "8_m_lin_1", text: "In the equation y = -3x + 5, what does -3 represent?", options: ["The slope", "The y-intercept", "The x-intercept", "The variable"], correctIndex: 0, explanation: "In slope-intercept form (y=mx+b), 'm' is the slope." }]
  },
  "functions basics": {
    def: "A relationship where each input (x) has exactly one unique output (y). Functions model cause-and-effect patterns in math and science.",
    why: "The basis of all computer programming (inputs/outputs) and understanding dependencies in systems.",
    obj: ["Identify functions from tables, graphs, and mappings", "Apply the vertical line test", "Determine domain and range"],
    prob: "If f(x) = -2x + 10, determine the output for an input of x = 4.",
    steps: ["Substitute 4 for x in the expression: -2(4) + 10.", "Multiply: -8 + 10.", "Add: 2.", "Conclusion: f(4) = 2."],
    quiz: [{ id: "8_m_fun_1", text: "Which test is used on a graph to determine if it represents a function?", options: ["Vertical Line Test", "Horizontal Line Test", "Parallel Test", "Slope Test"], correctIndex: 0, explanation: "If a vertical line crosses the graph more than once, it is not a function." }]
  },
  "pythagorean theorem": {
    def: "A mathematical law stating that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides: a² + b² = c².",
    why: "Used in construction, navigation, and architecture to find distances and ensure structures are 'square'.",
    obj: ["Find missing side lengths in right triangles", "Prove if a triangle is a right triangle using the converse", "Solve 3D distance problems"],
    prob: "A 10-foot ladder leans against a wall. The base of the ladder is 6 feet from the wall. How high does it reach?",
    steps: ["Identify the hypotenuse (c = 10) and one leg (a = 6).", "Set up the equation: 6² + b² = 10².", "Simplify: 36 + b² = 100.", "Isolate b²: b² = 64.", "Find root: b = 8 feet."],
    quiz: [{ id: "8_m_pyth_1", text: "In a right triangle with legs of 3 and 4, what is the hypotenuse?", options: ["5", "7", "25", "√7"], correctIndex: 0, explanation: "3² + 4² = 9 + 16 = 25. √25 = 5." }]
  },
  "scatter plots": {
    def: "A set of points plotted on a horizontal and vertical axis. They are used to observe relationships and correlations between two numerical variables.",
    why: "Used by analysts to find trends in data, such as the correlation between study hours and test results.",
    obj: ["Identify positive, negative, and no correlation", "Draw and interpret lines of best fit", "Spot outliers in a data set"],
    prob: "A scatter plot shows that as x increases, y generally decreases. Describe the correlation.",
    steps: ["Observe the direction of the trend line.", "Since variables move in opposite directions, it is negative.", "If the points form a tight cluster, it is a strong negative correlation.", "Conclusion: Negative Correlation."],
    quiz: [{ id: "8_m_sca_1", text: "What kind of correlation exists when the variables move in the same direction?", options: ["Positive Correlation", "Negative Correlation", "Zero Correlation", "Inverse Correlation"], correctIndex: 0, explanation: "Positive correlation means both variables increase or decrease together." }]
  },

  // --- GRADE 12 MATH ---
  "calculus ab/bc": {
    def: "A branch of mathematics focused on limits, functions, derivatives, integrals, and infinite series. BC calculus extends AB by including polar, parametric, and vector-valued functions.",
    why: "It is the mathematical language used to describe change in physics, engineering, economics, and medicine.",
    obj: ["Differentiate between the AB and BC curricula", "Understand the Mean Value Theorem", "Identify the relationship between differentiation and integration"],
    prob: "Determine if the function f(x) = x² satisfies the Mean Value Theorem on [0, 2] and find 'c'.",
    steps: ["Check continuity and differentiability on [0, 2]. (f is a polynomial, so yes).", "Calculate f(2) = 4 and f(0) = 0.", "Find average rate of change: (4-0)/(2-0) = 2.", "Find f'(x) = 2x.", "Set 2x = 2, so c = 1.", "Conclusion: c=1 exists in (0, 2)."],
    quiz: [{ id: "12_m_ab_bc_1", text: "Which theorem guarantees a point where the instantaneous rate equals the average rate?", options: ["Mean Value Theorem", "Intermediate Value Theorem", "Rolle's Theorem", "Taylor's Theorem"], correctIndex: 0, explanation: "The Mean Value Theorem (MVT) relates the average and instantaneous rates of change." }]
  },
  "limits and continuity": {
    def: "The study of the value that a function 'approaches' as the input approaches some value. Continuity requires the limit to exist and equal the function value at that point.",
    why: "Provides the rigorous foundation for all calculus operations, ensuring we can safely divide by 'near-zero' values.",
    obj: ["Evaluate one-sided limits", "Define the 3 criteria for continuity", "Apply L'Hôpital's Rule to indeterminate forms"],
    prob: "Evaluate the limit as x approaches 0 for sin(x)/x.",
    steps: ["Direct substitution yields 0/0 (Indeterminate).", "Apply L'Hôpital's Rule: Take derivative of numerator (cos x) and denominator (1).", "Evaluate cos(0)/1.", "The result is 1."],
    quiz: [{ id: "12_m_limits_1", text: "If lim (x->a) f(x) = L and f(a) = M, and L != M, the function is:", options: ["Discontinuous", "Continuous", "Undefined", "Infinite"], correctIndex: 0, explanation: "For continuity, the limit must equal the function value (L=M)." }]
  },
  "differentiation": {
    def: "The process of finding the derivative, which represents the instantaneous rate of change or the slope of the tangent line to a curve.",
    why: "Essential for optimization—finding maximum profit, minimum surface area, or peak velocity.",
    obj: ["Apply the Chain, Product, and Quotient rules", "Perform Implicit Differentiation", "Solve related rates problems"],
    prob: "Find the derivative of f(x) = e^(3x) * cos(x).",
    steps: ["Identify the Product Rule: (u*v)' = u'v + uv'.", "Let u = e^(3x) and v = cos(x).", "Calculate u' = 3e^(3x) and v' = -sin(x).", "Plug into formula: 3e^(3x)cos(x) + e^(3x)(-sin(x)).", "Final result: e^(3x)(3cos(x) - sin(x))."],
    quiz: [{ id: "12_m_diff_1", text: "What is the derivative of ln(x)?", options: ["1/x", "e^x", "x", "1"], correctIndex: 0, explanation: "The derivative of the natural log of x is 1/x." }]
  },
  "integration": {
    def: "The inverse process of differentiation, used to find the accumulation of quantities, such as area under a curve, volume, and total distance.",
    why: "Allows us to calculate total quantities from varying rates (e.g., total fuel used from flow rate data).",
    obj: ["Evaluate Definite and Indefinite integrals", "Use Integration by Parts", "Perform U-substitution"],
    prob: "Evaluate the integral of x * e^x dx using integration by parts.",
    steps: ["Formula: ∫u dv = uv - ∫v du.", "Let u = x (easy to derive) and dv = e^x dx (easy to integrate).", "Then du = dx and v = e^x.", "Apply formula: x*e^x - ∫e^x dx.", "Evaluate remaining integral: x*e^x - e^x + C.", "Factor: e^x(x - 1) + C."],
    quiz: [{ id: "12_m_int_1", text: "The area under a velocity vs time graph represents:", options: ["Displacement", "Acceleration", "Force", "Power"], correctIndex: 0, explanation: "Integrating velocity over time yields total displacement." }]
  },
  "vector calculus": {
    def: "A branch of mathematics concerned with differentiation and integration of vector fields, primarily in 3D Euclidean space.",
    why: "The standard tool for describing electromagnetism, fluid dynamics, and gravitation.",
    obj: ["Calculate Gradient, Divergence, and Curl", "Evaluate line and surface integrals", "Apply Green's and Stokes' Theorems"],
    prob: "Find the gradient of f(x, y, z) = x²y + sin(z).",
    steps: ["Calculate partial derivative with respect to x: 2xy.", "Calculate partial derivative with respect to y: x².", "Calculate partial derivative with respect to z: cos(z).", "Form the vector ∇f = <2xy, x², cos(z)>."],
    quiz: [{ id: "12_m_vec_1", text: "If the divergence of a vector field is zero everywhere, the field is called:", options: ["Solenoidal", "Conservative", "Irrotational", "Harmonic"], correctIndex: 0, explanation: "A solenoidal (or incompressible) field has zero divergence." }]
  },
  "multivariable study": {
    def: "Extending calculus to functions of multiple variables (x, y, z, ...), involving partial derivatives and multiple integrals.",
    why: "Real-world systems rarely depend on just one variable; modeling weather, markets, or engineering loads requires multivariable analysis.",
    obj: ["Find local extrema using the Second Derivative Test", "Evaluate double and triple integrals in various coordinate systems", "Understand Lagrange Multipliers for constrained optimization"],
    prob: "Calculate the volume under z = x + y over the rectangle [0, 1] x [0, 2].",
    steps: ["Set up the double integral: ∫(0 to 2) ∫(0 to 1) (x + y) dx dy.", "Integrate with respect to x: [1/2 x² + xy] from 0 to 1 = 1/2 + y.", "Now integrate (1/2 + y) with respect to y from 0 to 2.", "[1/2 y + 1/2 y²] from 0 to 2 = (1 + 2) - 0 = 3.", "Result: 3 units³."],
    quiz: [{ id: "12_m_multi_1", text: "What technique is used to find the maximum of a function subject to a constraint?", options: ["Lagrange Multipliers", "Integration by Parts", "Chain Rule", "Linear Approximation"], correctIndex: 0, explanation: "Lagrange Multipliers are the primary tool for constrained optimization." }]
  },

  // --- GRADE 12 SCIENCE ---
  "environmental science": {
    def: "An interdisciplinary field that integrates physical, biological, and information sciences to study the environment and solution of environmental problems.",
    why: "Provides the tools needed to navigate the complex interactions between human civilization and Earth's systems.",
    obj: ["Define environmental ethics", "Identify major environmental legislations (NEPA, ESA)", "Understand the concept of a 'Tragedy of the Commons'"],
    prob: "A shared pasture is being overgrazed. If each farmer adds one more cow for personal profit, why does the system fail?",
    steps: ["Identify the shared resource (pasture).", "Note individual benefit (+1 cow profit).", "Note shared cost (degraded grass quality).", "Explain that individual profit exceeds shared cost for each actor.", "Conclude that cumulative impact destroys the resource."],
    quiz: [{ id: "12_s_env_1", text: "The 'Tragedy of the Commons' describes:", options: ["Overuse of shared resources", "High taxes on farmland", "A natural disaster", "Conflict over private property"], correctIndex: 0, explanation: "It occurs when individuals act in self-interest to deplete a shared resource." }]
  },
  "ecology & energy": {
    def: "The study of how energy flows through ecosystems, from primary producers to apex predators, governed by the laws of thermodynamics.",
    why: "Explains why apex predators are rare and why trophic levels are limited by energy loss.",
    obj: ["Apply the Second Law of Thermodynamics to food webs", "Calculate energy transfer using the 10% Rule", "Identify Net Primary Productivity (NPP)"],
    prob: "If a corn field (producer) has 10,000 kJ of energy, how much reaches a human (secondary consumer) who eats the chicken that ate the corn?",
    steps: ["Identify levels: Corn (1) -> Chicken (2) -> Human (3).", "Trophic level 1: 10,000 kJ.", "Apply 10% to Level 2 (Chicken): 10,000 * 0.10 = 1,000 kJ.", "Apply 10% to Level 3 (Human): 1,000 * 0.10 = 100 kJ.", "Result: 100 kJ."],
    quiz: [{ id: "12_s_eco_1", text: "What percentage of energy is typically transferred to the next trophic level?", options: ["10%", "50%", "90%", "1%"], correctIndex: 0, explanation: "Roughly 90% of energy is lost as heat; only 10% is stored as biomass." }]
  },
  "pollution control": {
    def: "Mechanisms and strategies used to reduce or eliminate the release of pollutants into the environment.",
    why: "Vital for public health and maintaining ecosystem services like clean water and breathable air.",
    obj: ["Compare Point vs. Non-Point source pollution", "Evaluate remediation techniques like bioremediation", "Understand the Clean Air and Clean Water Acts"],
    prob: "Suggest a method to remove oil from a contaminated beach using biological agents.",
    steps: ["Identify the pollutant (hydrocarbons).", "Select Bioremediation (using microbes).", "Introduce oil-degrading bacteria or add nutrients to stimulate local bacteria.", "Monitor breakdown of oil into CO2 and water."],
    quiz: [{ id: "12_s_pol_1", text: "Which is a non-point source of pollution?", options: ["Agricultural runoff", "A factory pipe", "A sewage outlet", "A specific oil tanker leak"], correctIndex: 0, explanation: "Non-point sources are diffuse and cannot be traced to a single origin point." }]
  },
  "sustainability": {
    def: "The principle of meeting the needs of the present without compromising the ability of future generations to meet their own needs.",
    why: "The core challenge for 21st-century development across all industries.",
    obj: ["Identify the Three Pillars (Economic, Social, Environmental)", "Analyze Life Cycle Assessments (LCA)", "Understand Renewable vs. Non-renewable resources"],
    prob: "A company wants to build a new factory. Perform a 'Triple Bottom Line' evaluation.",
    steps: ["Environment: Impact on local wetlands and emissions.", "Social: Job creation and local community health.", "Economic: Profitability and tax revenue.", "Evaluate if all three metrics show a positive or neutral balance."],
    quiz: [{ id: "12_s_sus_1", text: "What are the three pillars of sustainability?", options: ["Economic, Social, Environmental", "Power, Fuel, Wealth", "Past, Present, Future", "Soil, Water, Air"], correctIndex: 0, explanation: "Sustainability requires balancing financial, societal, and ecological health." }]
  },
  "population science": {
    def: "The study of population dynamics, including birth rates, death rates, carrying capacity, and resource consumption.",
    why: "Predicts future demand for food, energy, and infrastructure as the global population shifts.",
    obj: ["Analyze Age Structure Diagrams", "Calculate Doubling Time using the Rule of 70", "Understand r-selected vs. K-selected species"],
    prob: "If a population grows at 2% annually, how long will it take to double?",
    steps: ["Use the Rule of 70: Doubling Time = 70 / growth rate.", "Growth rate = 2.", "70 / 2 = 35.", "Result: 35 years."],
    quiz: [{ id: "12_s_pop_1", text: "Which species is typically K-selected?", options: ["Elephants", "Insects", "Bacteria", "Dandelions"], correctIndex: 0, explanation: "K-selected species have few offspring and invest heavily in their survival (stable environments)." }]
  },
  "atmospheric study": {
    def: "The scientific study of the Earth's atmosphere, its composition, layers, and the physical processes that drive weather and climate.",
    why: "Critical for understanding global warming, ozone depletion, and planetary health.",
    obj: ["Identify the five layers of the atmosphere", "Explain the Greenhouse Effect", "Understand the Albedo Effect"],
    prob: "Explain why melting polar ice caps creates a 'Positive Feedback Loop'.",
    steps: ["Identify the Albedo effect: Ice reflects sunlight (high albedo).", "Note melting: Ice turns into dark water (low albedo).", "Observe absorption: Dark water absorbs more heat than ice.", "Identify feedback: More heat causes more ice to melt.", "Conclude: The process accelerates itself."],
    quiz: [{ id: "12_s_atm_1", text: "Which layer of the atmosphere contains the ozone layer?", options: ["Stratosphere", "Troposphere", "Mesosphere", "Exosphere"], correctIndex: 0, explanation: "The Stratosphere holds the critical UV-absorbing ozone layer." }]
  }
};

export const isTopicIncomplete = (title: string): boolean => {
  return !TOPIC_DETAILS[title.toLowerCase()];
};

const generateLessonContent = (unitTitle: string, type: 'intro' | 'practice' | 'quiz'): ContentBlock[] => {
  const normTitle = unitTitle.toLowerCase();
  const isIncomplete = isTopicIncomplete(unitTitle);
  
  const data = TOPIC_DETAILS[normTitle] || {
    def: `This module for "${unitTitle}" is currently being drafted by our curriculum team.`,
    why: `This unit is a core part of the Grade-level curriculum and will be fully expanded soon.`,
    obj: ["Review upcoming objectives", "Prepare for modular logic"],
    prob: `Wait for unique content for ${unitTitle}.`,
    steps: ["Content arriving soon.", "Check the Unit Status page for updates."],
    quiz: [{ id: `gen_${normTitle}`, text: `Is this unit currently marked as "In Development"?`, options: ["Yes, checking Status Page for more info", "No, it is complete", "I'm not sure"], correctIndex: 0, explanation: "We are actively adding deep specific content to every unit." }]
  };

  if (type === 'intro') {
    return [
      { type: "text", content: `# ${unitTitle}: ${isIncomplete ? '[IN DEVELOPMENT]' : 'Conceptual Foundations'}\n\n${data.def}\n\n### Strategic Importance\n${data.why}` },
      { type: "callout", variant: isIncomplete ? "warning" : "info", title: isIncomplete ? "Status: Pending Expansion" : "Success Metrics", content: data.obj.map(o => `- ${o}`).join('\n') },
      { type: "quiz", id: `q-intro-${normTitle}`, title: "Conceptual Audit", questions: [data.quiz[0]] }
    ];
  }

  if (type === 'practice') {
    return [
      { type: "text", content: `# Practical Application: ${unitTitle}\n\n${isIncomplete ? 'This specific walkthrough is in development.' : 'Engage with this specific scenario to validate your operational understanding.'}` },
      { type: "example", title: unitTitle, problem: data.prob, steps: data.steps }
    ];
  }

  return [
    { type: "text", content: `# Final Proficiency Validation: ${unitTitle}\n\n${isIncomplete ? 'A custom assessment for this unit is arriving soon.' : 'Complete the following specific evaluation to confirm your mastery.'}` },
    { type: "quiz", id: `q-final-${normTitle}`, title: `${unitTitle} Validation`, questions: data.quiz }
  ];
};

const createCompleteCourse = (grade: string, subject: string): Course => {
  const unitTitles = CURRICULUM_MAP[grade]?.[subject] || [`Grade ${grade} ${subject} Unit 1`, "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"];
  
  return {
    id: `${grade}-${subject.toLowerCase()}`,
    grade,
    subject,
    title: `${subject} Grade ${grade}`,
    description: `A specialized 6-unit academic curriculum for Grade ${grade} ${subject}, aligned with core proficiency standards.`,
    units: unitTitles.map((ut, idx) => ({
      id: `${grade}-${subject.toLowerCase()}-u${idx}`,
      title: ut,
      lessons: [
        { id: `${grade}-${subject.toLowerCase()}-u${idx}-l1`, title: "Concepts", description: "Theory and logic.", content: generateLessonContent(ut, 'intro') },
        { id: `${grade}-${subject.toLowerCase()}-u${idx}-l2`, title: "Practice", description: "Applied logic.", content: generateLessonContent(ut, 'practice') },
        { id: `${grade}-${subject.toLowerCase()}-u${idx}-l3`, title: "Validation", description: "Assessment.", content: generateLessonContent(ut, 'quiz') }
      ]
    }))
  };
};

const ALL_COURSES: Course[] = [];

const GRADES = [...GRADE_LEVELS.ELEMENTARY, ...GRADE_LEVELS.MIDDLE, ...GRADE_LEVELS.HIGH];
const MAIN_SUBJECTS = ["Math", "Science", "ELA", "Social Studies"];

GRADES.forEach(g => {
  MAIN_SUBJECTS.forEach(s => {
    ALL_COURSES.push(createCompleteCourse(g, s));
  });
});

ALL_COURSES.push({
  id: "elec-cs",
  grade: "Electives",
  subject: "Electives",
  title: "Foundations of Computer Science",
  description: "A comprehensive look at algorithmic efficiency, data structures, and computational thinking.",
  units: [
    {
      id: "u-cs-1",
      title: "Complexity Theory",
      lessons: [
        { id: "l-cs-1", title: "Big O Notation", description: "Measuring efficiency.", content: generateLessonContent("Complexity", "intro") }
      ]
    }
  ]
});

export const COURSES = ALL_COURSES;
