"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("お問い合わせを送信いたしました。ありがとうございます。")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold text-gray-800 text-center mb-12">Contact Us</h1>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-gray-800 text-center">お問い合わせ先</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Mail className="text-[#002060]" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">メール</h3>
                      <p className="text-gray-600">info@orchestra-piu-folle.jp</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <Phone className="text-[#002060]" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">電話</h3>
                      <p className="text-gray-600">03-1234-5678</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-3">
                    <MessageCircle className="text-[#002060]" size={32} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">SNS</h3>
                      <p className="text-gray-600">
                        各種SNSのDMでも
                        <br />
                        お気軽にどうぞ
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-gray-800 text-center">お問い合わせフォーム</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      件名
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div className="text-center">
                    <Button type="submit" className="bg-[#002060] hover:bg-[#001040] text-white px-8 py-3">
                      送信
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
