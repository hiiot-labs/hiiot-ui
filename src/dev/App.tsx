import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(`Hello! Input value: ${inputValue}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HiiotUI Component Library
          </h1>
          <p className="text-lg text-gray-600">
            A modern React component library built with TypeScript and Tailwind CSS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Button Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6">Button Components</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">States</h3>
                <div className="flex flex-wrap gap-2">
                  <Button loading={loading} onClick={handleButtonClick}>
                    {loading ? 'Loading...' : 'Click Me'}
                  </Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6">Input Components</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Input</h3>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">With Helper Text</h3>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="We'll never share your email with anyone else."
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Error State</h3>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error="Password must be at least 8 characters"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
                <div className="space-y-2">
                  <Input size="sm" placeholder="Small input" />
                  <Input size="md" placeholder="Medium input" />
                  <Input size="lg" placeholder="Large input" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App