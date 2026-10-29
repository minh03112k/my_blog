import { useState } from 'react'
import './BSTInsertionWalkthrough.css'

const steps = [
  {
    val: 50,
    x: 250,
    y: 40,
    parent: undefined,
    explanation: 'Create the root node with value 50.',
  },
  {
    val: 30,
    x: 150,
    y: 125,
    parent: 50,
    explanation: '30 < 50. Create a left child under 50.',
  },
  {
    val: 70,
    x: 350,
    y: 125,
    parent: 50,
    explanation: '70 > 50. Create a right child under 50.',
  },
  {
    val: 20,
    x: 85,
    y: 210,
    parent: 30,
    explanation:
      '20 < 50, then 20 < 30. Recursion creates a left child under 30.',
  },
  {
    val: 40,
    x: 215,
    y: 210,
    parent: 30,
    explanation:
      '40 < 50, then 40 > 30. Recursion creates a right child under 30.',
  },
] as const

/** Replays the shared lesson's five insertions; the newest node is highlighted. */
export function BSTInsertionWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0)
  const current = steps[stepIndex]
  if (!current) return null
  const visibleNodes = steps.slice(0, stepIndex + 1)

  return (
    <section className="bst-walkthrough" aria-label="BST insertion walkthrough">
      <h2 id="bst-insertion-walkthrough">BST insertion walkthrough</h2>
      <p>
        Insert 50, 30, 70, 20, 40. Use the controls to follow the tree as it
        grows.
      </p>
      <div aria-live="polite" aria-atomic="true">
        <p className="bst-step">
          Step {stepIndex + 1} of {steps.length} · Insert {current.val}
        </p>
        <p className="bst-explanation">{current.explanation}</p>
      </div>
      <svg
        viewBox="0 0 500 255"
        aria-label={`Tree after inserting ${visibleNodes.map((node) => node.val).join(', ')}. ${current.explanation}`}
      >
        {visibleNodes.map((node) => {
          const parent = visibleNodes.find(
            (candidate) => candidate.val === node.parent,
          )
          return parent ? (
            <line
              key={`edge-${node.val}`}
              x1={parent.x}
              y1={parent.y}
              x2={node.x}
              y2={node.y}
              stroke="var(--muted)"
              strokeWidth="2"
            />
          ) : null
        })}
        {visibleNodes.map((node) => (
          <g key={node.val}>
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              fill={
                node.val === current.val ? 'var(--violet)' : 'var(--surface)'
              }
              stroke="var(--violet)"
              strokeWidth={node.val === current.val ? 3 : 1.5}
            />
            <text
              x={node.x}
              y={node.y}
              dy=".35em"
              textAnchor="middle"
              fill={node.val === current.val ? '#fff' : 'var(--text)'}
              fontSize="17"
              fontWeight="600"
            >
              {node.val}
            </text>
          </g>
        ))}
      </svg>
      <p className="bst-legend">Highlighted node: newly inserted value</p>
      <div className="bst-controls">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={stepIndex === steps.length - 1}
          onClick={() =>
            setStepIndex((index) => Math.min(steps.length - 1, index + 1))
          }
        >
          Next
        </button>
      </div>
    </section>
  )
}
