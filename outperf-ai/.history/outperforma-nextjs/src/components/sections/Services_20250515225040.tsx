interface ServiceCardProps {
  title: string
  purpose: string
  values: string[]
}

function ServiceCard({ title, purpose, values }: ServiceCardProps) {
  return (
