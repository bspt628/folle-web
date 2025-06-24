import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const historyItems = [
    { year: "2025", event: "Orchestra più folle設立" },
    { year: "2025", event: "第1回定期演奏会開催" },
  ]

  return (
    <div className="pt-20">
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">Orchestra più Folle について</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Orchestra più Folle（Fオケ）は東京大学音楽部管弦楽団の団員とOBOGを中心に結成されたオーケストラです。「più Folle」は「もっと狂って」という意味を持ちます。
            一見不思議な団体に見えますが、一人一人個性を持った団員が音楽と向き合い、熱狂的に音を紡ぐという意味合いが込められています。若く熱狂的な演奏で、クラシック音楽の魅力を一歩踏み込んでお届けするオーケストラです。
            </p>
          </div>
        </div>
      </section>

      {/* Conductor Message */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-800 text-center mb-12">代表者挨拶</h2>

            <Card>
              <CardContent className="p-8">
                <div className="md:flex items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0 text-center">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt="Conductor"
                      width={150}
                      height={150}
                      className="rounded-full mx-auto mb-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">代表</p>
                      <p className="text-[#002060] font-serif text-lg font-bold">藤井 敦也</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Orchestra più folleの音楽監督を務めさせていただいております田中太郎です。
                      当団は設立から14年を迎え、多くの音楽愛好家の皆様に支えられながら成長してまいりました。
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      私たちが大切にしているのは、技術の向上はもちろんのこと、
                      音楽を通じて人と人とのつながりを深め、聴いてくださる皆様に感動をお届けすることです。
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      これからも地域の皆様に愛されるオーケストラとして、
                      心に響く演奏をお届けできるよう、団員一同精進してまいります。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-800 text-center mb-12">History</h2>

            <div className="space-y-6">
              {historyItems.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <span className="inline-block bg-[#002060] text-white px-4 py-2 rounded-full font-mono text-sm font-semibold">
                          {item.year}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{item.event}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
