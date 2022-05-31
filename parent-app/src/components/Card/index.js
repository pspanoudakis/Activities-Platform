import { Card } from 'react-bootstrap'

export default function CardObj() {

  return (
    <div class='px-3'>
      <div class="bg-gray-50 py-8 px-4 h-80 w-18 max-w-sm rounded-3xl shadow-lg">
        <img class="w-44 h-44" src="" alt="" />
        <div class="px-6 py-3">
          <div class="text-xl mb-2">
            Τίτλος
          </div>
          <p class="text-gray-700 text-base">
            Περιγραφή
          </p>
        </div>
      </div>
    </div>
  );
}
