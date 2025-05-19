import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Full portfolio projects data
  const allProjects = [
    {
      id: 1,
      title: "UI/UX Design",
      category: "Mobile App",
      description: "A sleek mobile app interface design with intuitive user experience for a finance application. The design focuses on clear information hierarchy and visual feedback.",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      image: "https://images.unsplash.com/photo-1542641728-6ca359b085f4",
    },
    {
      id: 2,
      title: "Digital Art",
      category: "Illustration",
      description: "A series of digital illustrations featuring abstract gradient designs with a modern aesthetic. Created for a technology brand's marketing campaign.",
      technologies: ["Photoshop", "Illustrator", "Procreate"],
      image: "https://images.unsplash.com/photo-1563089145-599997674d42",
    },
    {
      id: 3,
      title: "3D Modeling",
      category: "Visual Design",
      description: "3D modeling and visualization project for an architectural firm. Created realistic 3D models with detailed textures and lighting effects.",
      technologies: ["Blender", "Cinema 4D", "Substance Painter"],
      image: "https://images.unsplash.com/photo-1633432695467-66403aa96bfd",
    },
    {
      id: 4,
      title: "Logo Design",
      category: "Branding",
      description: "Minimalist logo design for a real estate company. The design emphasizes simplicity, memorability, and versatility across different media.",
      technologies: ["Illustrator", "InDesign", "Photoshop"],
      image: "https://images.unsplash.com/photo-1535567679266-c113f99615bd",
    },
    {
      id: 5,
      title: "Web Design",
      category: "UI/UX",
      description: "Responsive website design for a creative agency. Features modern layout, interactive elements, and smooth animations for enhanced user experience.",
      technologies: ["Figma", "HTML/CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
    },
    {
      id: 6,
      title: "Digital Art",
      category: "Abstract",
      description: "Abstract digital art compositions featuring vibrant colors and geometric shapes. Created for an art exhibition focused on digital media.",
      technologies: ["Photoshop", "Illustrator", "After Effects"],
      image: "https://images.unsplash.com/photo-1653023500770-3a3b64a1b4c4",
    },
    {
      id: 7,
      title: "Mobile App Design",
      category: "UI/UX",
      description: "UI/UX design for a food delivery mobile application with a focus on user-friendly navigation and intuitive ordering process.",
      technologies: ["Figma", "Sketch", "Principle"],
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02",
    },
    {
      id: 8,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand identity package for a startup technology company, including logo, color palette, typography, and brand guidelines.",
      technologies: ["Illustrator", "InDesign", "Photoshop"],
      image: "https://images.unsplash.com/photo-1634942536746-49b9e89ad27b",
    },
    {
      id: 9,
      title: "Motion Graphics",
      category: "Animation",
      description: "Animated promotional video for a tech product launch, featuring dynamic motion graphics and visual storytelling.",
      technologies: ["After Effects", "Cinema 4D", "Premiere Pro"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    },
    {
      id: 10,
      title: "Social Media Kit",
      category: "Digital Marketing",
      description: "Comprehensive social media design package for a fashion brand, including post templates, story templates, and profile designs.",
      technologies: ["Photoshop", "Illustrator", "Canva"],
      image: "https://images.unsplash.com/photo-1518122417676-6926cb28bcf9",
    },
    {
      id: 11,
      title: "Photography Editing",
      category: "Retouching",
      description: "Professional photo retouching and color grading for a fashion photography collection, enhancing visual appeal while maintaining realism.",
      technologies: ["Photoshop", "Lightroom", "Capture One"],
      image: "https://images.unsplash.com/photo-1515467359615-4d9c6352098b",
    },
    {
      id: 12,
      title: "Packaging Design",
      category: "Product Design",
      description: "Creative packaging design for an organic skincare product line, balancing aesthetic appeal with functional requirements.",
      technologies: ["Illustrator", "Photoshop", "Dimension"],
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    },
    {
      id: 13,
      title: "Infographic Design",
      category: "Information Design",
      description: "Data visualization and infographic design for an annual report, transforming complex information into visually engaging and easy-to-understand graphics.",
      technologies: ["Illustrator", "InDesign", "Tableau"],
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec",
    },
    {
      id: 14,
      title: "AR Experience",
      category: "Interactive",
      description: "Augmented reality experience design for a museum exhibition, creating interactive digital elements that enhance the physical display.",
      technologies: ["Unity", "AR Kit", "Photoshop"],
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    },
    {
      id: 15,
      title: "Editorial Design",
      category: "Print",
      description: "Magazine layout and editorial design for a lifestyle publication, focusing on typography, image placement, and overall reading experience.",
      technologies: ["InDesign", "Photoshop", "Illustrator"],
      image: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1",
    },
  ];

  // Get unique categories for filter
  const categories = ["all", ...new Set(allProjects.map(project => project.category.toLowerCase()))];

  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? allProjects 
    : allProjects.filter(project => project.category.toLowerCase() === filter);

  // Get the projects to display based on the current limit
  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  // Show loader when the load more button is in view
  useEffect(() => {
    if (inView && visibleProjects < filteredProjects.length && !isLoading) {
      loadMoreProjects();
    }
  }, [inView, filteredProjects.length, visibleProjects]);

  // Function to load more projects
  const loadMoreProjects = () => {
    setIsLoading(true);
    
    // Simulate a delay to show the loading effect
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
      setIsLoading(false);
    }, 1000);
  };

  // Reset visible projects when filter changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [filter]);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="animated-bg fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 z-[-1]"></div>
      
      {/* Floating particles effect */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i+1}`}></div>
        ))}
      </div>

      {/* Header with back button */}
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur-lg z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Portfolio</h1>
          <motion.button
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white"
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Category filters */}
        <div className="overflow-x-auto scrollbar-hide mb-6">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  filter === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-800/50 text-gray-300"
                }`}
                onClick={() => setFilter(category)}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index % 3 * 0.1 }}
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold material-text">{project.title}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-600/30 rounded-full text-purple-300">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg text-white text-sm font-medium border border-purple-500/30 hover:from-blue-500/30 hover:to-purple-600/30"
                    whileTap={{ scale: 0.97 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more button or loader */}
        {displayedProjects.length < filteredProjects.length && (
          <div 
            ref={ref}
            className="mt-8 flex justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="loading-spinner w-6 h-6 border-2 border-purple-500 border-t-transparent"></div>
                <span className="text-gray-300">Loading more...</span>
              </div>
            ) : (
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium material-button elevation-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMoreProjects}
              >
                Load More
              </motion.button>
            )}
          </div>
        )}

        {/* Empty state */}
        {displayedProjects.length === 0 && (
          <div className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block text-4xl mb-4"
            >
              😕
            </motion.div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-400">
              No projects match the selected filter. Try a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;