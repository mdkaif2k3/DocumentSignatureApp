import { useDraggable } from "@dnd-kit/core";

function SignatureField() {
  const { attributes, listeners, setNodeRef, transform} = useDraggable({ id: "signature" });
  const style = { transform: transform ? `translate3d( ${transform.x}px, ${transform.y}px, 0 )` : undefined };
  return (
    <div ref={setNodeRef} style={style} {...listeners}{...attributes} className="w-32 h-12 border-2 border-blue-500 bg-blue-100 flex items-center justify-center cursor-grab">
      Sign Here
    </div>
  );
}

export default SignatureField;