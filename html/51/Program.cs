using System.Drawing;
using System.Security.Cryptography.X509Certificates;

namespace Shirts
{
    internal class Program
    {
        List<Shirt> shirts = new List<Shirt>();
        public Program() {
     
             MakeShirts();

            PrintShirts();
        }

        static void Main(string[] args)
        {
          new Program();
        }
        public void MakeShirts()
        {
            Colors[] colors = new Colors[] { new Colors("Red"), new Colors("Blue"), new Colors("Green")};
            Pattern[] pattern = new Pattern[] { new Pattern("stripes"), new Pattern("Dots"), new Pattern("Plain") };


            for (int i = 0; i < pattern.Length; i++)
            {
                for (int j = 0; j < colors.Length; j++)
                {
                    Shirt s = new Shirt(pattern[i], colors[j]);
                    shirts.Add(s);
                }
            }

        }

        public void PrintShirts() { 
        
            for (int i = 0;i < shirts.Count; i++)
            {
                Console.WriteLine(shirts[i]);
            }
        }

    }


    internal class Colors
    {
       public string color;

        public Colors(string color)
        {
            this.color = color;
        }

        public override string? ToString()
        {
            return color;
        }
    }


    internal class Pattern
    {
        public string pattern;

        public Pattern(string pattern)
        {
            this.pattern = pattern;
        }

        public override string? ToString()
        {
            return pattern;
        }
    }

    internal class Shirt
    {
        public Pattern pattern;
        public Colors color;
       
        public Shirt(Pattern pattern, Colors color)
        {
            this.pattern = pattern;
            this.color = color;
        }

        public override string? ToString()
        {
            return $"{color} {pattern} shirt";
        }
    }  
    
}