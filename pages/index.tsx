import React, { useState, useEffect } from 'react';

// Simple UI component implementations
const Card = ({ children, className }) => (
  <div className={`bg-white border rounded-lg shadow-sm overflow-hidden ${className || ''}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b p-4">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

const Badge = ({ children, variant, style, onClick, className }) => {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClass = variant === "outline" 
    ? "bg-transparent border" 
    : variant === "secondary" 
      ? "bg-gray-100 text-gray-800" 
      : "bg-blue-100 text-blue-800";
  
  return (
    <span 
      className={`${baseClass} ${variantClass} ${className || ''} ${onClick ? 'cursor-pointer' : ''}`} 
      style={style}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

const Button = ({ children, variant, onClick }) => {
  const baseClass = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantClass = variant === "outline" 
    ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 px-4 py-2" 
    : "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2";
  
  return (
    <button 
      className={`${baseClass} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const LearningExpertiseVisualization = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [energyFlowing, setEnergyFlowing] = useState(false);
  
  // Define expertise nodes (simplified for reliability)
  const skillNodes = [
    { 
      id: 'instructional', 
      name: 'Instructional Design', 
      type: 'core',
      x: 300, 
      y: 150, 
      radius: 45,
      color: '#3498db',
      description: 'Creating structured, effective learning experiences',
      relatedSkills: ['facilitation', 'edtech', 'curriculum']
    },
    { 
      id: 'community', 
      name: 'Community Building', 
      type: 'core',
      x: 500, 
      y: 180, 
      radius: 50,
      color: '#e74c3c',
      description: 'Fostering thriving learning communities',
      relatedSkills: ['facilitation', 'mentoring', 'crosscultural']
    },
    { 
      id: 'facilitation', 
      name: 'Facilitation', 
      type: 'core',
      x: 400, 
      y: 300, 
      radius: 45,
      color: '#2ecc71',
      description: 'Guiding and enhancing learning processes',
      relatedSkills: ['instructional', 'community', 'mentoring']
    },
    { 
      id: 'crosscultural', 
      name: 'Cross-Cultural Communication', 
      type: 'specialized',
      x: 600, 
      y: 250, 
      radius: 40,
      color: '#9b59b6',
      description: 'Bridging diverse perspectives effectively',
      relatedSkills: ['community', 'facilitation']
    },
    { 
      id: 'curriculum', 
      name: 'Curriculum Development', 
      type: 'specialized',
      x: 200, 
      y: 200, 
      radius: 35,
      color: '#f39c12',
      description: 'Designing comprehensive learning journeys',
      relatedSkills: ['instructional', 'edtech']
    },
    { 
      id: 'mentoring', 
      name: 'Mentor Training', 
      type: 'specialized',
      x: 450, 
      y: 400, 
      radius: 35,
      color: '#16a085',
      description: 'Developing effective learning guides',
      relatedSkills: ['facilitation', 'community']
    },
    { 
      id: 'edtech', 
      name: 'Educational Technology', 
      type: 'specialized',
      x: 250, 
      y: 350, 
      radius: 30,
      color: '#3498db',
      description: 'Leveraging digital tools for learning',
      relatedSkills: ['instructional', 'curriculum']
    }
  ];

  // Define ecosystem connections
  const connections = [
    { source: 'instructional', target: 'facilitation', strength: 4 },
    { source: 'instructional', target: 'curriculum', strength: 5 },
    { source: 'instructional', target: 'edtech', strength: 3 },
    { source: 'community', target: 'facilitation', strength: 5 },
    { source: 'community', target: 'crosscultural', strength: 3 },
    { source: 'community', target: 'mentoring', strength: 4 },
    { source: 'facilitation', target: 'mentoring', strength: 4 },
    { source: 'facilitation', target: 'crosscultural', strength: 3 },
    { source: 'curriculum', target: 'edtech', strength: 3 },
    { source: 'crosscultural', target: 'community', strength: 3 }
  ];

  // Define emergent capabilities
  const emergentCapabilities = [
    {
      id: 'cohortlearning',
      name: 'Cohort-Based Learning Design',
      skills: ['instructional', 'community', 'facilitation'],
      description: 'Creating structured learning experiences that leverage peer connections',
      x: 400,
      y: 200,
      color: '#8e44ad'
    },
    {
      id: 'culturallearning',
      name: 'Cross-Cultural Learning Design',
      skills: ['instructional', 'crosscultural', 'curriculum'],
      description: 'Developing curriculum effective across diverse cultural contexts',
      x: 350,
      y: 250,
      color: '#d35400'
    },
    {
      id: 'scalablecommunity',
      name: 'Scalable Community Systems',
      skills: ['community', 'mentoring', 'facilitation'],
      description: 'Building self-sustaining learning communities through peer mentorship',
      x: 500,
      y: 300,
      color: '#c0392b'
    }
  ];

  // Helper function to get node by ID
  const getNodeById = (id) => {
    return skillNodes.find(node => node.id === id);
  };

  // Toggle energy animation
  const toggleEnergyFlow = () => {
    setEnergyFlowing(!energyFlowing);
  };

  // Check if emergent capability should be visible
  const isEmergentVisible = (capability) => {
    if (!selectedNode) return false;
    return capability.skills.includes(selectedNode);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Learning Expertise Ecosystem</CardTitle>
            <Button 
              variant={energyFlowing ? "default" : "outline"}
              onClick={toggleEnergyFlow}
            >
              {energyFlowing ? "Pause Energy Flow" : "Activate Energy Flow"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            This visualization shows how learning design expertise forms an interconnected ecosystem rather than isolated skills. 
            Click any skill to explore its connections and contributions to the learning design process.
          </p>
          
          <div className="relative h-[500px] border rounded-lg overflow-hidden bg-gray-50">
            {/* SVG for connections and nodes */}
            <svg width="100%" height="100%" className="absolute top-0 left-0">
              {/* Draw connections between nodes */}
              {connections.map((conn, index) => {
                const source = getNodeById(conn.source);
                const target = getNodeById(conn.target);
                
                // Calculate if this connection should be highlighted
                const isHighlighted = selectedNode && 
                  (selectedNode === conn.source || selectedNode === conn.target);
                
                return (
                  <line
                    key={index}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isHighlighted ? "#000" : "#ccc"}
                    strokeWidth={isHighlighted ? conn.strength : Math.max(1, conn.strength - 2)}
                    strokeOpacity={isHighlighted ? 0.8 : 0.4}
                    strokeDasharray={energyFlowing ? "5,5" : "none"}
                  />
                );
              })}
              
              {/* Draw emergent capabilities */}
              {emergentCapabilities.map((capability, index) => {
                const isVisible = isEmergentVisible(capability);
                if (!isVisible) return null;
                
                return (
                  <g key={`emergent-${index}`}>
                    {capability.skills.map((skillId, i) => {
                      const skill = getNodeById(skillId);
                      return (
                        <line
                          key={`emergent-line-${index}-${i}`}
                          x1={capability.x}
                          y1={capability.y}
                          x2={skill.x}
                          y2={skill.y}
                          stroke={capability.color}
                          strokeWidth={2}
                          strokeOpacity={0.6}
                          strokeDasharray="3,3"
                        />
                      );
                    })}
                    <circle
                      cx={capability.x}
                      cy={capability.y}
                      r={25}
                      fill={capability.color}
                      fillOpacity={0.2}
                      stroke={capability.color}
                      strokeWidth={1}
                    />
                    <text
                      x={capability.x}
                      y={capability.y + 5}
                      textAnchor="middle"
                      fontSize={10}
                      fill={capability.color}
                      fontWeight="bold"
                    >
                      Emergent
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Draw the nodes */}
            {skillNodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isRelated = selectedNode && 
                getNodeById(selectedNode).relatedSkills.includes(node.id);
              
              let nodeOpacity = 0.7;
              let strokeWidth = 1;
              
              if (isSelected) {
                nodeOpacity = 1;
                strokeWidth = 3;
              } else if (isRelated) {
                nodeOpacity = 0.9;
                strokeWidth = 2;
              } else if (selectedNode) {
                nodeOpacity = 0.4;
              }
              
              return (
                <div key={node.id}>
                  {/* Node */}
                  <div
                    className="absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg"
                    style={{
                      width: node.radius * 2,
                      height: node.radius * 2,
                      left: node.x - node.radius,
                      top: node.y - node.radius,
                      backgroundColor: `${node.color}${isSelected ? 'ee' : '99'}`,
                      border: `${strokeWidth}px solid ${node.color}`,
                      boxShadow: isSelected ? `0 0 15px ${node.color}` : 'none',
                      zIndex: isSelected ? 10 : 5
                    }}
                    onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  >
                    <span className="text-white text-xs font-semibold text-center px-2">
                      {node.name.split(' ')[0]}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <div
                    className={`absolute text-xs ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                    style={{
                      left: node.x + node.radius + 5,
                      top: node.y,
                      color: node.color,
                      fontWeight: isSelected ? 'bold' : 'normal',
                      textShadow: '1px 1px 2px white'
                    }}
                  >
                    {node.name}
                  </div>
                </div>
              );
            })}
            
            {/* Emergent capability labels */}
            {emergentCapabilities.map((capability, index) => {
              const isVisible = isEmergentVisible(capability);
              if (!isVisible) return null;
              
              return (
                <div
                  key={`emergent-label-${index}`}
                  className="absolute bg-white bg-opacity-70 rounded p-1 shadow-sm"
                  style={{
                    left: capability.x + 30,
                    top: capability.y - 10,
                    borderLeft: `3px solid ${capability.color}`,
                    maxWidth: '200px'
                  }}
                >
                  <p className="text-xs font-bold" style={{ color: capability.color }}>
                    {capability.name}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-xs text-gray-600">Skill Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#8e44ad' }}></div>
              <span className="text-xs text-gray-600">Emergent Capability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Core Skill</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Specialized Skill</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Skill Details */}
      {selectedNode && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                <span style={{ color: getNodeById(selectedNode).color }}>
                  {getNodeById(selectedNode).name}
                </span>
              </CardTitle>
              <Badge
                variant="outline"
                style={{ 
                  borderColor: getNodeById(selectedNode).color,
                  color: getNodeById(selectedNode).color,
                }}
                onClick={() => console.log(`Skill type: ${getNodeById(selectedNode).type}`)}
                className="text-xs"
              >
                {getNodeById(selectedNode).type === 'core' ? 'Core Skill' : 'Specialized Skill'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {getNodeById(selectedNode).description}
            </p>
            
            <h3 className="text-sm font-semibold mb-2">Connected Skills:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {getNodeById(selectedNode).relatedSkills.map((relatedId) => (
                <Badge 
                  key={relatedId}
                  variant="outline"
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${getNodeById(relatedId).color}15`, 
                    color: getNodeById(relatedId).color,
                    border: `1px solid ${getNodeById(relatedId).color}`
                  }}
                  onClick={() => setSelectedNode(relatedId)}
                >
                  {getNodeById(relatedId).name}
                </Badge>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Emergent Capabilities:</h3>
              <div className="space-y-3">
                {emergentCapabilities
                  .filter(cap => cap.skills.includes(selectedNode))
                  .map((capability, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg"
                      style={{ 
                        backgroundColor: `${capability.color}15`,
                        borderLeft: `3px solid ${capability.color}`
                      }}
                    >
                      <h4 
                        className="text-sm font-semibold mb-1"
                        style={{ color: capability.color }}
                      >
                        {capability.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {capability.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {capability.skills
                          .filter(skillId => skillId !== selectedNode)
                          .map((skillId) => (
                            <Badge 
                              key={skillId}
                              variant="outline"
                              className="text-xs cursor-pointer"
                              style={{ 
                                borderColor: getNodeById(skillId).color,
                                color: getNodeById(skillId).color
                              }}
                              onClick={() => setSelectedNode(skillId)}
                            >
                              + {getNodeById(skillId).name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Ecosystem Insights */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Learning Design Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Understanding the Learning Design Ecosystem</h3>
            <p className="text-gray-700 mb-3">
              This visualization demonstrates how learning design expertise functions as an interconnected ecosystem rather than 
              isolated skills. The connections between skills are as important as the individual competencies themselves.
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Core skills</strong> (larger circles) serve as the foundation of expertise, while 
              <strong> specialized skills</strong> (smaller circles) provide depth in specific areas.
            </p>
            <p className="text-gray-700">
              Most importantly, when skills are combined, they create <strong>emergent capabilities</strong> (highlighted when 
              you select a skill) that are more powerful than any individual skill. These combinations 
              represent the most effective approaches to learning design.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningExpertiseVisualization;