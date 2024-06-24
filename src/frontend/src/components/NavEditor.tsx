// Boiler plate code I was going to use if I had time to elaborate on UI More

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, SmileIcon, UnderlineIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function NavEditor(){
    return (
    <div className="max-w-[800px] bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <div className="flex space-x-2 p-2 border-b border-gray-200 dark:border-gray-800">
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Bold</span>
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Italic</span>
          <ItalicIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Underline</span>         
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Left Align</span>
          <AlignLeftIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Center Align</span>
          <AlignCenterIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Right Align</span>
          <AlignRightIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Bulleted List</span>
          <ListIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Add Link</span>
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Image</span>
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
          <span className="sr-only">Emoji</span>
          <SmileIcon className="w-4 h-4" />
        </Button>
      </div>
      <textarea
        className="w-full h-full p-4 text-gray-600 dark:text-gray-200 text-sm"
        placeholder="Type your text here..."
      />
    </div>
  )
}