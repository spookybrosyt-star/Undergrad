
import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Menu, X, CheckCircle, Layout, Star, GraduationCap, ArrowLeft, School, Atom, Calculator, BookType, Globe, Monitor, HelpCircle, Info } from 'lucide-react';
import { COURSES, GRADE_LEVELS, isTopicIncomplete } from './data/courses';
import { Course, Lesson, UserProgress } from './types';
import { getProgress, saveLessonComplete, saveQuizScore } from './utils/storage';
import MarkdownRenderer from './components/MarkdownRenderer';
import Quiz from './components/Quiz';
import InteractiveExample from './components/InteractiveExample';

type ViewState = 'HOME' | 'SUBJECT_SELECT' | 'COURSE_LIST' | 'LESSON_VIEW' | 'UNIT_STATUS';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SubjectIcons: Record<string, React.ReactNode> = {
    "Math": <Calculator size={28} className="text-rose-400" />,
    "Science": <Atom size={28} className="text-emerald-400" />,
    "ELA": <BookType size={28} className="text-rose-300" />,
    "Social Studies": <Globe size={28} className="text-indigo-400" />,
    "Electives": <Monitor size={28} className="text-purple-400" />
  };

  const handleGradeSelect = (category: string, grade: string) => {
    setSelectedGradeCategory(category);
    setSelectedGrade(grade);
    setView('SUBJECT_SELECT');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setView('COURSE_LIST');
  };

  const handleCourseSelect = (course: Course) => {
    setActiveCourse(course);
    setView('LESSON_VIEW');
    setActiveLesson(null); 
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLessonComplete = () => {
    if (activeLesson) {
      const newProgress = saveLessonComplete(activeLesson.id);
      setProgress(newProgress);
    }
  };

  const handleQuizComplete = (quizId: string, score: number) => {
    const newProgress = saveQuizScore(quizId, score);
    setProgress(newProgress);
  };

  const goBack = () => {
    if (activeLesson) {
      setActiveLesson(null);
    } else if (view === 'UNIT_STATUS') {
      setView('HOME');
    } else if (view === 'LESSON_VIEW') {
      setView('COURSE_LIST');
      setActiveCourse(null);
    } else if (view === 'COURSE_LIST') {
      setView('SUBJECT_SELECT');
      setSelectedSubject(null);
    } else if (view === 'SUBJECT_SELECT') {
      setView('HOME');
      setSelectedGrade(null);
    }
  };

  if (view === 'HOME') {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <header className="glass border-b border-white/5 py-5 px-6 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 bg-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-rose-600/20">
                  <GraduationCap className="text-white" size={20} />
               </div>
               <h1 className="text-xl font-bold text-white tracking-tight">undergrad</h1>
             </div>
             <button onClick={() => setView('UNIT_STATUS')} className="text-neutral-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest click-effect transition-colors">
               <HelpCircle size={16} /> Content Status
             </button>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full">
           <div className="text-center mb-16 mt-8">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">K-12 Educational Mastery</h2>
             <p className="text-lg text-neutral-400 max-w-2xl mx-auto">Structured, 6-unit courses across all core subjects and grade levels.</p>
           </div>
           
           <div className="grid gap-6 md:grid-cols-3">
             <div className="glass-card rounded-2xl p-8 group">
               <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-rose-400 border border-white/5">
                 <School size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-6">Elementary School</h3>
               <div className="grid grid-cols-3 gap-2">
                 {GRADE_LEVELS.ELEMENTARY.map(g => (
                   <button key={g} onClick={() => handleGradeSelect("Elementary", g)} className="py-2.5 rounded-lg bg-white/5 hover:bg-rose-600 text-white border border-white/5 font-semibold transition-all click-effect">
                     {g}
                   </button>
                 ))}
               </div>
             </div>
             
             <div className="glass-card rounded-2xl p-8">
               <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-white/5">
                 <BookOpen size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-6">Middle School</h3>
               <div className="grid grid-cols-3 gap-2">
                 {GRADE_LEVELS.MIDDLE.map(g => (
                   <button key={g} onClick={() => handleGradeSelect("Middle", g)} className="py-2.5 rounded-lg bg-white/5 hover:bg-emerald-600 text-white border border-white/5 font-semibold transition-all click-effect">
                     {g}
                   </button>
                 ))}
               </div>
             </div>
             
             <div className="glass-card rounded-2xl p-8">
               <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-rose-500 border border-white/5">
                 <Layout size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-6">High School</h3>
               <div className="grid grid-cols-2 gap-2">
                 {GRADE_LEVELS.HIGH.map(g => (
                   <button key={g} onClick={() => handleGradeSelect("High", g)} className="py-2.5 rounded-lg bg-white/5 hover:bg-rose-600 text-white border border-white/5 font-semibold transition-all click-effect">
                     Grade {g}
                   </button>
                 ))}
               </div>
             </div>
           </div>
           
           <div className="mt-10 max-w-sm mx-auto">
             <button onClick={() => handleGradeSelect("Electives", "Electives")} className="w-full glass-card hover:bg-white/5 p-5 rounded-2xl flex items-center justify-center gap-3 text-white font-semibold transition-all click-effect">
                <Monitor size={20} className="text-rose-400"/>
                Academic Electives
             </button>
           </div>
        </main>
      </div>
    );
  }

  if (view === 'UNIT_STATUS') {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <header className="glass border-b border-white/5 py-5 px-6 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
             <button onClick={goBack} className="p-2 hover:bg-white/5 rounded-full text-rose-500 transition-colors click-effect"><ArrowLeft size={20} /></button>
             <h1 className="text-lg font-bold text-white uppercase tracking-widest">Content Roadmap</h1>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
           <div className="bg-rose-600/10 border border-rose-600/20 p-8 rounded-2xl mb-12">
             <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Info className="text-rose-400" /> Modular Content Rollout</h2>
             <p className="text-neutral-300 leading-relaxed">Undergrad is a high-fidelity academic platform. We are currently rolling out custom, unique curriculum data for all 480+ units. Units marked with <HelpCircle size={16} className="inline text-rose-400" /> are in the "Research & Drafting" phase and feature standard logic placeholders.</p>
           </div>

           <div className="space-y-12">
             {COURSES.map(course => {
               const incompleteUnits = course.units.filter(u => isTopicIncomplete(u.title));
               if (incompleteUnits.length === 0) return null;
               return (
                 <div key={course.id} className="border-b border-white/5 pb-8">
                   <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                     <span className="text-rose-400">{course.subject}</span> Grade {course.grade}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {course.units.map(u => (
                       <div key={u.id} className={`p-4 rounded-xl border flex items-center justify-between ${isTopicIncomplete(u.title) ? 'bg-white/5 border-rose-500/20' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
                         <span className={`font-medium ${isTopicIncomplete(u.title) ? 'text-neutral-400' : 'text-emerald-400'}`}>{u.title}</span>
                         {isTopicIncomplete(u.title) ? (
                           <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded">In Development</span>
                         ) : (
                           <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Complete</span>
                         )}
                       </div>
                     ))}
                   </div>
                 </div>
               );
             })}
           </div>
        </main>
      </div>
    );
  }

  if (view === 'SUBJECT_SELECT') {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <header className="glass border-b border-white/5 py-4 px-6 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
             <button onClick={goBack} className="p-2 hover:bg-white/5 rounded-full text-rose-500 transition-colors click-effect"><ArrowLeft size={20} /></button>
             <h1 className="text-lg font-bold text-white">
               {selectedGrade === 'Electives' ? 'Electives' : `Grade ${selectedGrade}`}
             </h1>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
           <h2 className="text-3xl font-bold text-white mb-10 text-center">Select Subject</h2>
           <div className="grid gap-4 md:grid-cols-2">
             {['Math', 'Science', 'ELA', 'Social Studies', 'Electives'].map(subject => {
                if (selectedGradeCategory === 'Electives' && subject !== 'Electives') return null;
                if (selectedGradeCategory !== 'Electives' && subject === 'Electives') return null;
                return (
                  <button 
                    key={subject} 
                    onClick={() => handleSubjectSelect(subject)}
                    className="glass-card p-6 rounded-2xl flex items-center gap-6 text-left group click-effect"
                  >
                    <div className="p-3 bg-white/5 rounded-xl group-hover:scale-105 transition-transform">
                      {SubjectIcons[subject] || <BookOpen size={28}/>}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">{subject}</h3>
                      <p className="text-neutral-500 text-sm mt-0.5">Academic Track</p>
                    </div>
                    <ChevronRight className="ml-auto text-neutral-700 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
             })}
           </div>
        </main>
      </div>
    );
  }

  if (view === 'COURSE_LIST') {
    const availableCourses = COURSES.filter(c => c.grade === selectedGrade && c.subject === selectedSubject);
    return (
       <div className="min-h-screen flex flex-col font-sans">
        <header className="glass border-b border-white/5 py-4 px-6 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
             <button onClick={goBack} className="p-2 hover:bg-white/5 rounded-full text-rose-500 transition-colors click-effect"><ArrowLeft size={20} /></button>
             <h1 className="text-lg font-bold text-white">Grade {selectedGrade} &bull; {selectedSubject}</h1>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
           <div className="grid gap-5">
             {availableCourses.map(course => (
                <button 
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className="glass-card p-8 rounded-2xl text-left click-effect group"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">{course.title}</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">{course.description}</p>
                  <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-sm">
                    Enter Curriculum <ChevronRight size={18} />
                  </div>
                </button>
             ))}
           </div>
        </main>
      </div>
    );
  }

  if (view === 'LESSON_VIEW' && activeCourse) {
    if (!activeLesson) {
      return (
        <div className="min-h-screen text-white font-sans p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <button onClick={goBack} className="mb-10 flex items-center gap-2 text-neutral-400 hover:text-white font-semibold px-4 py-2 bg-white/5 rounded-lg border border-white/10 transition-colors click-effect">
              <ArrowLeft size={16} /> Subjects
            </button>
            <header className="mb-16 text-center">
              <span className="inline-block px-3 py-1 bg-rose-600/20 text-rose-400 border border-rose-600/30 rounded-full text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">{activeCourse.grade === 'Electives' ? 'Elective' : `Grade ${activeCourse.grade}`}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{activeCourse.title}</h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">{activeCourse.description}</p>
            </header>
            
            <div className="grid gap-6">
              {activeCourse.units.map((unit) => {
                const templated = isTopicIncomplete(unit.title);
                return (
                  <div key={unit.id} className="glass-card rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-white/5 p-5 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h2 className={`text-lg font-bold ${templated ? 'text-neutral-400' : 'text-white'}`}>{unit.title}</h2>
                        {templated && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setView('UNIT_STATUS'); }}
                            className="text-rose-500 hover:text-rose-400 transition-colors p-1"
                            title="This unit is currently in development. Click for details."
                          >
                            <HelpCircle size={18} />
                          </button>
                        )}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 bg-black/40 px-2 py-0.5 rounded border border-white/5">6 Lessons</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {unit.lessons.map((lesson) => {
                        const isCompleted = progress.completedLessons.includes(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonSelect(lesson)}
                            className="w-full text-left p-5 hover:bg-white/5 transition-all flex items-center justify-between group click-effect"
                          >
                            <div>
                              <h3 className={`text-base font-bold transition-colors ${templated ? 'text-neutral-500 group-hover:text-rose-400' : 'text-neutral-200 group-hover:text-rose-400'}`}>{lesson.title}</h3>
                              <p className="text-xs text-neutral-500 mt-1">{lesson.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {isCompleted ? (
                                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-400/10">
                                  <CheckCircle size={12} /> Done
                                </div>
                              ) : (
                                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center transition-all border border-white/5 ${templated ? 'text-neutral-700 group-hover:bg-rose-900 group-hover:text-white' : 'text-neutral-600 group-hover:bg-rose-600 group-hover:text-white'}`}>
                                  <ChevronRight size={16} />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const isCompleted = progress.completedLessons.includes(activeLesson.id);
    return (
      <div className="flex h-screen overflow-hidden text-white font-sans">
        <div className="lg:hidden fixed top-0 w-full h-16 glass border-b border-white/5 z-30 flex items-center justify-between px-4">
           <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="text-neutral-400 click-effect"><Menu size={24} /></button>
             <span className="font-bold text-white truncate max-w-[200px] text-sm">{activeLesson.title}</span>
           </div>
           <button onClick={() => setActiveLesson(null)} className="text-neutral-400 click-effect"><X size={24} /></button>
        </div>

        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 glass border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-white/5 flex items-center justify-between h-16">
            <button onClick={() => setActiveLesson(null)} className="flex items-center gap-2 text-neutral-400 font-bold text-xs uppercase tracking-widest hover:text-rose-400 transition-colors click-effect"><ArrowLeft size={14} /> Course Units</button>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-600"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto py-6">
            {activeCourse?.units.map(unit => (
              <div key={unit.id} className="mb-6">
                <div className="px-6 py-1.5 text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{unit.title}</div>
                {unit.lessons.map(lesson => {
                   const isActive = lesson.id === activeLesson.id;
                   const isDone = progress.completedLessons.includes(lesson.id);
                   return (
                     <button
                       key={lesson.id}
                       onClick={() => handleLessonSelect(lesson)}
                       className={`w-full text-left px-6 py-3 text-sm flex items-start gap-3 transition-all click-effect border-r-4 ${isActive ? 'bg-rose-600/5 border-rose-600 text-rose-400 font-bold' : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-200 border-transparent'}`}
                     >
                       <div className={`mt-0.5 flex-shrink-0 ${isDone ? 'text-emerald-400' : isActive ? 'text-rose-500' : 'text-neutral-700'}`}>{isDone ? <CheckCircle size={16} /> : <BookOpen size={16} />}</div>
                       <span className="leading-relaxed">{lesson.title}</span>
                     </button>
                   );
                })}
              </div>
            ))}
          </div>
        </aside>

        {isSidebarOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <main className="flex-1 flex flex-col h-full relative pt-16 lg:pt-0">
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
            <div className="max-w-3xl mx-auto pb-40">
              <header className="mb-10 border-b border-white/5 pb-8">
                 <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">{activeLesson.title}</h1>
                 <p className="text-neutral-400 text-base leading-relaxed">{activeLesson.description}</p>
              </header>

              <div className="space-y-12">
                {activeLesson.content.map((block, idx) => {
                  switch (block.type) {
                    case 'text':
                      return <div key={idx} className="prose prose-invert prose-rose prose-lg max-w-none"><MarkdownRenderer content={block.content} /></div>;
                    case 'callout':
                      const colors = {
                        info: "bg-rose-600/5 border-rose-600/20 text-rose-200 icon-rose-500",
                        warning: "bg-amber-600/5 border-amber-600/20 text-amber-200 icon-amber-500",
                        tip: "bg-emerald-600/5 border-emerald-600/20 text-emerald-200 icon-emerald-500"
                      };
                      return (
                        <div key={idx} className={`p-6 rounded-xl border ${colors[block.variant]} shadow-sm`}>
                           <h4 className="font-bold mb-2.5 flex items-center gap-2 text-base">
                             {block.variant === 'tip' && <Star size={16} className="fill-current text-rose-500" />}
                             {block.title}
                           </h4>
                           <p className="opacity-80 leading-relaxed text-sm">{block.content}</p>
                        </div>
                      );
                    case 'example':
                      return <InteractiveExample key={idx} title={block.title} problem={block.problem} steps={block.steps} />;
                    case 'quiz':
                      return <Quiz key={idx} id={block.id} title={block.title} questions={block.questions} onComplete={(score) => handleQuizComplete(block.id, score)} />;
                    default: return null;
                  }
                })}
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
                 {isCompleted ? (
                   <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-2xl p-8 text-center w-full max-w-sm">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-400"><CheckCircle size={24} /></div>
                      <h3 className="text-xl font-bold text-white mb-0.5">Lesson Mastery</h3>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Progress Saved</p>
                   </div>
                 ) : (
                   <button onClick={handleLessonComplete} className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-rose-600/10 transition-all flex items-center gap-3 click-effect group">
                     Complete & Save <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
                   </button>
                 )}
                 {isCompleted && (
                   <div className="mt-8">
                     <button onClick={() => {
                           let found = false;
                           for (const u of activeCourse!.units) {
                             for (const l of u.lessons) {
                               if (found) { handleLessonSelect(l); return; }
                               if (l.id === activeLesson.id) found = true;
                             }
                           }
                           setActiveLesson(null);
                        }} className="text-neutral-400 hover:text-rose-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors click-effect">Advance <ChevronRight size={14} /></button>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;
